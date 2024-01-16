import { NextResponse } from "next/server";
import db from "../auth/[...nextauth]/db.js";

export async function GET(request) {
	try {
		const results = await db.query("SELECT * FROM Products");
		return NextResponse.json({ data: results}, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ data: error }, { status: 200 });
	}
}

export async function POST(request) {
	let st = `INSERT INTO Products (Data, Description, Quantity, Price, ImageSourceLink)
			  VALUES 
			  (${request.body.Data}, ${request.Descritption}, ${request.Quantity}, ${request.Price}, '')`;
	console.log(JSON.stringify(request))
	console.log(st)
	// const results = await db.query(st);
	return NextResponse.json({ data : "results" }, { status: 200 });
}
