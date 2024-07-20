import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import VerificationEmail from "../../../../../emails/VerificationsEmail";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Generate verification token
    const hashedToken = await bcryptjs.hash(savedUser._id.toString(), 10);
    await User.findByIdAndUpdate(savedUser._id, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Send verification email
    const verificationLink = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
    
    const subject =  VerificationEmail({username: username, otp:verifyCode , url: verificationLink })

    await sendEmail({
      email,
      emailType: "verification", 
      message: subject,
    });

    // Return success response
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json({success:false,  message: error.message }, { status: 500 });
  }
}
