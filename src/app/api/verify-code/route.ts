import connectDB from "@/lib/dbConnect";
import UserModal from "@/models/User";

export async function POST(request: Request) {
  await connectDB();
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModal.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 500,
        }
      );
    }
    const isCodeValid = user.verifyToken === code;
    const isCodeNotExpired = new Date(user.verifyTokenExpiry) >= new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified sucessfully.",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json({
        success: false,
        message: "Verification code has expired",
      });
    } else {
      return Response.json({
        success: false,
        message: "Incorrect Verification Code",
      });
    }
  } catch (error) {
    console.error(" Error verifing user", error);
    return Response.json({
      success: false,
      message: "Error verifing user",
    });
  }
}
