import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    // Define the path to the PDF file
    const pdfPath = path.join(process.cwd(), "diwlali.pdf");

    // Read the file asynchronously
    const fileBuffer = await fs.readFile(pdfPath);

    // Parse the PDF file
    const data = await pdf(fileBuffer);

    console.log(data);

    // Return response with success message
    return NextResponse.json({
      message: "Success",
      success: true,
      data: data.text // You can return the parsed text if needed
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
