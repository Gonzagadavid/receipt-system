import { validateExp } from "./utils/validateExp";
import { Routes, routesInfo } from "./constants/routes";
import { NextResponse } from "next/server";
import { auth } from "./app/api/auth/auth";

export async function middleware(request) {
  const session = await auth();
  if (!session || (session && !validateExp(session.expires))) {
    return NextResponse.redirect(new URL(Routes.login, request.url));
  }
  const pathname = request?.nextUrl?.pathname;
  if (
    routesInfo?.[pathname] &&
    !routesInfo[pathname].role.includes(session.role)
  ) {
    return NextResponse.redirect(new URL(Routes.root, request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|login|favicon.ico|_next/static|_next/image|.*\\.png$).*)",
  ],
};
