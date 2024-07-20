import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationMail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    //todo : mail sending logic
    return { success: true, message: "Verification email sent successfully " };
  } catch (error) {
    console.error("Error sending verification email", error);
    return { success: false, message: "Error sending verification email" };
  }
}
