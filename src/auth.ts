import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
//import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { prisma } from "./app/lib/prisma";

//const prisma = new PrismaClient();

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
