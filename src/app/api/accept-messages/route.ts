import connectDB from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "@/models/User";

export async function GET(req: Request, res: Response) {
  await connectDB();
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  const user: User = session?.user;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authorized",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  console.log(userId);
}
