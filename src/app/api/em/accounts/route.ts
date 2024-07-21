import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { Account } from "@/models/expanseMangement";

connect();
export async function GET() {
  return NextResponse.json({ message: "Hello - GET" });
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { account_name, account_type, user_id } = reqBody;
    const account = await Account.findOne({ accountName: account_name });
    console.log("account");
    if (account) {
      return NextResponse.json(
        { message: "Account Already Exists" },
        { status: 400 }
      );
    }
    const newAccount = new Account({
      accountName: account_name,
      accoutType: account_type,
      userId: user_id,
    });

    const savedAccount = await newAccount.save();
    console.log("test", savedAccount);

    return NextResponse.json({
      message: "Account Registered Successfully",
      sucess: true,
      savedAccount,
    });
  } catch (e: any) {
    return NextResponse.json({ message: e });
  }
}

export async function PUT() {
  return NextResponse.json({ message: "Hello - PUT" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Hello - DELETE" });
}
