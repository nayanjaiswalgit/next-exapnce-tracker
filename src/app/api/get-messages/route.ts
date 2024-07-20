// aggregation pipeline

import connectDB from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModal from "@/models/User";

export async function GET(reqeust: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || !session.user) {
    return Response.json(
      {
        sucess: false,
        message: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }
  const userId = mongoose.Types.ObjectId.createFromHexString(user._id);
  try {
    const user = await UserModal.aggregate([
      { $match: { id: userId } },
      { $unwind: "$message" },
      { $sort: { "message.createdAt": -1 } },
      { $group: { _id: "$_id", message: { $push: "$message" } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          sucess: false,
          message: "User not found",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json({
      sucess: true,
      data: user[0].message,
    });
  } catch (error) {}
}
