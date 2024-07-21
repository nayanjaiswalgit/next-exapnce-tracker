import { getDataFromToken } from "@/helpers/getDatatFromToken";
import connectDB from "@/lib/dbConnect";
import { Expense } from "@/models/expanseMangement";
import UserModal from "@/models/User";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getLogo } from "./helper";

export async function GET(request: NextRequest, response: Response) {
  try {
    const _id = getDataFromToken(request);
    const user = await UserModal.findOne({ _id });
    if (!_id || !user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const expenses = await Expense.find({ user: _id }).sort({ createdAt: -1 });

    return NextResponse.json({ expenses });
  } catch (error) {
    console.error("Error creating expense:", error);
    throw new Error("Error creating expense");
  }
}

export async function POST(request: NextRequest, response: Response) {
  await connectDB();
  try {
    const _id = getDataFromToken(request);
    const user = await UserModal.findOne({ _id });
    if (!_id || !user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const reqBody = await request.json();
    const { amount, description, category } = reqBody;

    if (!amount || !description)
      return NextResponse.json(
        { message: "reqired amount is not a number" },
        { status: 401 }
      );

    const expense = new Expense({
      amount,
      description,
      category,
      userId: _id,
    });

    const savedExpense = await expense.save();

    return NextResponse.json(
      { data: savedExpense, message: "created sucessfull" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating expense:", error);
    throw new Error("Error creating expense");
  }
}

export async function PUT() {
  return NextResponse.json({ message: "Hello - PUT" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Hello - DELETE" });
}
