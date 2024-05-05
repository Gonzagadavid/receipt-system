import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { getUser } from "@/app/login/lib/getUserr";
import { Routes } from "@/constants/routes";
export const {
  auth,
  signIn,
  signOut,
  handlers: { POST, GET },
} = NextAuth({
  pages: {
    signIn: Routes.login,
  },
  session: {
    maxAge: 12 * 60 * 60,
  },
  callbacks: {
    async session({ session }) {
      if (session) {
        const user = await getUser(session.user.email);
        session.role = user.role;
        session.user.id = user.id;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
});
