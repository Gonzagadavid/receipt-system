import NextAuth from "next-auth";
import { authConfig } from "./[...nextauth]";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { getUser } from "@/app/login/lib/getUserr";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
