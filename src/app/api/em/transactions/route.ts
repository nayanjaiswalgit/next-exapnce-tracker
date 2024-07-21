import { getDataFromToken } from "@/helpers/getDatatFromToken";
import connectDB from "@/lib/dbConnect";
import { Expense, Transaction } from "@/models/expanseMangement";
import UserModal from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: Response) {
  await connectDB();
  try {
    const _id = getDataFromToken(request);
    const user = await UserModal.findOne({ _id });
    if (!_id || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const expenses = await Transaction.find().populate("expenses").sort({
      createdAt: -1,
    });

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
    if (!_id || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const {
      transactionId,
      merchant,
      date,
      type,
      amount,
      description,
      notes,
      expenses,
    } = reqBody;

    if (!amount || !description) {
      return NextResponse.json(
        { message: "required amount is not a number" },
        { status: 401 }
      );
    }

    const transactionNumber =
      Date.now().toString() + Math.floor(Math.random() * 1000000).toString();

    const transaction = new Transaction({
      transactionId: transactionId || transactionNumber,
      merchant: merchant || "Local Shop",
      date: date || new Date(),
      type: type || "debit",
      amount,
      description,
      userId: _id,
      notes,
    });

    const savedTransaction = await transaction.save();

    const expensesPromises = expenses.map(
      (expense: { amount: any; description: any; category: any }) => {
        const newExpenses = new Expense({
          price: expense.amount,
          description: expense.description,
          userId: _id,
          expenseId: transaction._id,
        });
        return newExpenses.save();
      }
    );

    const savedExpenses = await Promise.all(expensesPromises);

    savedTransaction.expenses = savedExpenses.map(
      (savedExpense) => savedExpense._id
    );
    await savedTransaction.save();

    return NextResponse.json(
      { match: transaction, expense: savedExpenses },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error creating transaction:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PUT() {
  return NextResponse.json({ message: "Hello - PUT" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Hello - DELETE" });
}
