import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "user Already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    //send Verification email
    const hashedToken = await bcryptjs.hash(savedUser._id.toString(), 10);
    await User.findByIdAndUpdate(savedUser._id, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000,
    });
    const subject = `<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
    <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
    </a> `;
    await sendEmail({
      email,
      emailType: "verification",
      message: subject,
    });

    return NextResponse.json({
      message: "User Registered Successfully",
      sucess: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
