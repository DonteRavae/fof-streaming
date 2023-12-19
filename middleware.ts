import { NextRequest, NextResponse } from "next/server";
import { validateAccessToken } from "./utils/jwt";
import { STRIPE_STATUS } from "./utils/interfaces";

export const config = {
  runtime: "experimental-edge",
};

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const origin = request.headers.get("origin") || "http://localhost:3000";
  const accessCookie = request.cookies.get("ffat");

  if (accessCookie) {
    let claims = await validateAccessToken(accessCookie.value);

    if (!claims) {
      return NextResponse.redirect(`${origin}/access/signin`);
    }

    switch (claims.status) {
      case STRIPE_STATUS.CREATED:
        if (
          path.startsWith("/catalog") ||
          path.startsWith("/profiles") ||
          path === "/access/signup"
        )
          return NextResponse.redirect(`${origin}/access/signup/checkout`);
        break;
      case STRIPE_STATUS.ACTIVE:
        if (path === "/" || path.startsWith("/access"))
          return NextResponse.redirect(`${origin}/profiles/select`);
        break;
      case STRIPE_STATUS.CANCELED:
        if (
          path.startsWith("/profiles/select") ||
          path.startsWith("/catalog") ||
          path === "/"
        )
          return NextResponse.redirect(`${origin}/access/signup/checkout?restart=true`);
    }
    return NextResponse.next();
  }
}
