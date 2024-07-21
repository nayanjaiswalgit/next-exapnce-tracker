import connectDB from "@/lib/dbConnect";
import UserModal from "@/models/User";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: userNameValidation,
});

export async function GET(request: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = { username: searchParams.get("username") };
    const result = UsernameQuerySchema.safeParse(queryParams);
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError?.length > 0
              ? usernameError.join(",")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    console.log("zod result", result);

    const existingVerifiedUser = await UserModal.findOne({ username });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already Taken",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Username is unique",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error checking username");
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
