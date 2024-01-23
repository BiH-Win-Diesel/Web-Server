import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';


export async function middleware(request) {
  if (request.nextUrl.pathname === '/dashboard') {    
    const cookieStore = cookies()
    const auth_token = cookieStore.get("auth-token");
    if(auth_token === undefined) return NextResponse.redirect(new URL("/login",request.url));
    else NextResponse.next()
  }
}