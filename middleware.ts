import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // During development, you might want to disable the middleware
  return NextResponse.next();

  // Enable this in production:
  /*
  const path = request.nextUrl.pathname;
  const isAdminPath = path.startsWith("/admin") && path !== "/admin/login";
  const session = request.cookies.get("__session")?.value;

  if (isAdminPath && !session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: ["/admin/:path*"],
};
