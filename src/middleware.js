import { getToken } from "next-auth/jwt";
import { validateExp } from "./utils/validateExp";
import { Routes } from "./constants/routes";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!token || (token && !validateExp(token.exp)))
    request.redirect(new URL(Routes.login, request.url));
}

export const config = {
  matcher: ["/((?!api|login|_next/static|_next/image|.*\\.png$).*)"],
};
