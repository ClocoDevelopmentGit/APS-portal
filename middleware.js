import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token_admin")?.value;
  const redirectUrl =
    process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost:3000";

  const res = NextResponse.next();

  // Always set no-cache headers to prevent stale auth state
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("Surrogate-Control", "no-store");

  if (!token) {
    console.log("No token found, redirecting to login page.");
    return NextResponse.redirect(new URL("/Pages/LoginPage", redirectUrl));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

