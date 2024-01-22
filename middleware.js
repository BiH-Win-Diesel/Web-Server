import jwt from 'jsonwebtoken';
import { headers } from 'next/headers'
import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api/items')) {
    const headersList = headers()
    const auth_headers = headersList.get('auth-headers')
    jwt.verify(auth_headers,"KEY",(err, user)=>{
      if(err !== null){
        return NextResponse.redirect("http://localhost:3000/login");
      }
      else return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    })
  }
}