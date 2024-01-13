'use client'

// http://localhost:3000/api/auth/signin

import { SessionProvider } from "next-auth/react"

export default function Provider ({
  children,
  session
}){
  return <SessionProvider session={session}>
    {children}
  </SessionProvider>
}