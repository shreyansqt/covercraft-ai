import { NextResponse } from "next/server";
import { auth } from "./auth";

export const middleware = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/app", "/app/:path*"],
};
