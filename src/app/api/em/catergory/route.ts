import { getDataFromToken } from "@/helpers/getDatatFromToken";
import connectDB from "@/lib/dbConnect";
import { Category } from "@/models/expanseMangement";
import UserModal from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();
  try {
    const _id = getDataFromToken(req);
    const user = await UserModal.findOne({ _id });
    if (!_id || !user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reqBody = await req.json();
    const { icon, name, description } = reqBody;

    const newCategory = new Category({
      userId: _id,
      icon,
      name,
      description,
    });
    const savedCatergory = await newCategory.save();

    return NextResponse.json(
      { data: savedCatergory, message: "created sucessfull" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const _id = getDataFromToken(req);
    const user = await UserModal.findOne({ _id });
    if (!_id || !user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const category = await Category.find({
      $or: [{ isDefault: true }, { userId: _id }],
    });
    return NextResponse.json(
      { data: category, message: "get success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { data: error, message: "Server Error" },
      { status: 500 }
    );
  }
}
