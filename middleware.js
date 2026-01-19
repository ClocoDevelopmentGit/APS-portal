import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("admin_token")?.value;
  const redirectUrl =
    process.env.NEXT_PUBLIC_REDIRECT_URL || "http://localhost:3000";

  if (!token) {
    return NextResponse.redirect(new URL("/Pages/LoginPage", redirectUrl));
  }

  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
