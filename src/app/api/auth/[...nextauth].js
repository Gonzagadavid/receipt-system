import { getUser } from "@/app/login/lib/getUserr";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 43200,
  },
  callbacks: {
    async jwt({ token }) {
      if (token) {
        const user = await getUser(token.email);
        token.role = user.role;
      }

      return token;
    },
  },
};
