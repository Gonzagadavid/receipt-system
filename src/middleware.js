import { getToken } from "next-auth/jwt";
import { validateExp } from "./utils/validateExp";
import { Routes } from "./constants/routes";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  if (!token || (token && !validateExp(token.exp)))
    return NextResponse.redirect(new URL(Routes.login, request.url));
}

export const config = {
  matcher: ["/((?!api|login|users|_next/static|_next/image|.*\\.png$).*)"],
};
