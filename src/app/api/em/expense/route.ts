import axios from 'axios';
import { NextResponse } from 'next/server';


export async function GET() {
  
    const response = axios.post('http://localhost:3001/api/em/pdf-to-json/')
    const data = (await response).data
  return NextResponse.json({ ...data });
  
}

export async function POST() {
  return NextResponse.json({ data: "Hello" });
}

export async function PUT() {
  return NextResponse.json({ message: 'Hello - PUT' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Hello - DELETE' });
}