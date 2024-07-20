import { connect } from "@/dbConfig/dbConfig";
import { MappingConfig } from "@/models/expanseMangement";
import { NextRequest, NextResponse } from "next/server";

interface Transaction {
  bank: string;
  txnId: string;
  credit?: string;
  debit?: string;
  particulars: string;
  metaData?: any;
  balance:string
}
connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { bank, txnId, debit, credit,  particulars, metaData , balance} =
      reqBody as Transaction;

    const parser = await MappingConfig.findOne({bank})
    if(parser){
        return NextResponse.json({ message: 'Bank Mapping Already Exists' },  { status: 400 });
    }

    const newParser = new MappingConfig({
      bank,
      txnId,
      debit,
      credit,
      particulars,
      metaData,
      balance,
    });
    const savedParser = await newParser.save();

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedParser,
    });
  } catch(e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
}
