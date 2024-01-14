import { NextResponse } from "next/server";

export async function POST(request) {
  console.log(request);
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
