import { NextResponse } from 'next/server';
import data from "./dummy"
export async function GET() {
  return NextResponse.json({ message: 'Hello - GET' });
  
}

export async function POST() {
  return NextResponse.json({ data: data });
}

export async function PUT() {
  return NextResponse.json({ message: 'Hello - PUT' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Hello - DELETE' });
}