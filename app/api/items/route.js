import { NextResponse } from "next/server";
import db from "../auth/[...nextauth]/db.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (session === null) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    const results = await db.query("SELECT * FROM products");
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: error }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (session === null) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    const rq = await request.json();
    let st = `INSERT INTO products (Data, Description, Quantity, Price, ImageSourceLink) VALUES ('${rq.data}', '${rq.description}', ${rq.quantity}, ${rq.price}, '')`;
    const results = await db.query(st);
    return NextResponse.json({ data: "results" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (session === null) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }
    const rq = await request.json();
    let st = `UPDATE products SET Quantity = ${rq.quantity} where ProductID = ${rq.id}`;
    const results = await db.query(st);
    return NextResponse.json({ data: "results" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
