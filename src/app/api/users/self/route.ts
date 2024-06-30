import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDatatFromToken";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  return NextResponse.json({ message: "User fount", data: user });
}
