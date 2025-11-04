import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  // Protect only /sign-in route
  if (!req.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get("authorization");

  const USER = process.env.ADMIN_USER;
  const PASS = process.env.ADMIN_PASS;

  if (!basicAuth) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected Area"',
      },
    });
  }

  const [scheme, encoded] = basicAuth.split(" ");

  if (scheme !== "Basic") {
    return new NextResponse("Invalid auth scheme", { status: 401 });
  }

  const decoded = Buffer.from(encoded, "base64").toString();
  const [user, pass] = decoded.split(":");

  if (user === USER && pass === PASS) {
    return NextResponse.next();
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// Match only /sign-in
export const config = {
  matcher: ["/sign-in"],
};
