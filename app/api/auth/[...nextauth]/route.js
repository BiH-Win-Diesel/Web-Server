// import { authenticate } from "@/services/authService"
import { authenticate } from "@/services/authservice";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../[...nextauth]/db.js";

export const authOptions = {
  secret: "secret",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phonenumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          const results = await db.query(
            `select * from Users where PhoneNumber = ${credentials.phonenumber}`
          );
          if (results.length == 0) {
            return null;
          }
          const res = await authenticate(credentials.password, results[0]);
          if (typeof res !== "undefined") {
            return {
              id : res.user.id,
              name : res.user.name,
              email : res.user.email,
              jwt : res.token
            }
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks:{
    async signIn(d){
      return d
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.jwt = token.jwt;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
