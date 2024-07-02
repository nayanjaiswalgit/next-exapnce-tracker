import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDatatFromToken";
import { Income } from "@/models/expanseMangement";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        // Extract user ID from token
        const userId = await getDataFromToken(request);
        console.log('User ID:', userId);

        // Fetch income data associated with the user
        const income = await Income.find({ userId: userId }).select('amount date source');

        console.log('Income Data:', income);

        return NextResponse.json({
            message: "Income fetched successfully",
            data: income
        });
    } catch (error: any) {
        console.error('Error fetching income data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(request: NextRequest){

try {
    const reqBody = await request.json()
    const { amount, date, source} = reqBody;
    const userId = await getDataFromToken(request);
    const income = new Income({userId, amount, date, source});
    const savedIncome = await income.save();
    return NextResponse.json({
        message : "saved",
        sucess : true,
        savedIncome
    })


}
catch(error:any){ 

return NextResponse.json({error : error.message},{status:500});
}
}