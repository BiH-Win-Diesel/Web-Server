import { NextResponse } from "next/server";
import db from "../auth/[...nextauth]/db.js";

export async function GET(request) {
  try {
    const results = await db.query("SELECT * FROM Products");
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}

export async function POST(request) {
  try{
	const rq = await request.json();
	let st = `INSERT INTO Products (Data, Description, Quantity, Price, ImageSourceLink) VALUES ('${rq.data}', '${rq.description}', ${rq.quantity}, ${rq.price}, '')`;
	const results = await db.query(st);
	return NextResponse.json({ data: "results" }, { status: 200 });
  }catch(error){
	return NextResponse.json({ data: error }, { status: 500 });
  }
}
