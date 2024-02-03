import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from '../auth/[...nextauth]/db.js'

const saltRounds = 10;

export async function POST(request) {
  try{
    const rq = await request.json();
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(rq.password,salt);
    let st = `INSERT INTO users (Name, Email, PhoneNumber, Password) Values ("${rq.name}", "${rq.email}","${rq.phonenumber}","${hashedPassword}");`
    const results = await db.query(st);
    return NextResponse.json({ data: "User Created" }, { status: 200 });
  }catch(err){
    return NextResponse.json({ data: error }, { status: 500 });
  }
}
