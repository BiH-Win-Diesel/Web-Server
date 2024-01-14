// import { authenticate } from "@/services/authService"
import { authenticate } from "@/services/authservice";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: 'secret',
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          const res = authenticate(credentials.email,credentials.password)
          if (typeof res !== "undefined") {
            return { ...res.user, apiToken: res.token };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages:{
    signIn: "/login",
    newUser: '/signup'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
