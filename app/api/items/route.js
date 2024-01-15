import { NextResponse } from "next/server";
import db from "../auth/[...nextauth]/db.js";

async function handler(req, res) {}

export async function GET(request) {
	try {
		const results = await db.query("SELECT * FROM users");
		return NextResponse.json({ message: "Hello World" }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: error }, { status: 200 });
	}
}

export async function POST(request) {
	return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
