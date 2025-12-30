import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;
  console.log(token,"sdfffffffffffffffffffffffffffffffffffffffffffffffffffff")

  // Allow public routes
  if (pathname.startsWith("/")) {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/**
 * Run middleware only on these routes
 */
export const config = {
  matcher: ["/dashboard/:path*"],
};
