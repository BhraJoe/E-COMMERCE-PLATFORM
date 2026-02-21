import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
     const isLoggedIn = !!req.auth;
     const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
     const isProtectedRoute =
          req.nextUrl.pathname.startsWith("/checkout") ||
          req.nextUrl.pathname.startsWith("/account");

     if (isAuthPage) {
          if (isLoggedIn) {
               return NextResponse.redirect(new URL("/", req.nextUrl));
          }
          return NextResponse.next();
     }

     if (isProtectedRoute && !isLoggedIn) {
          let callbackUrl = req.nextUrl.pathname;
          if (req.nextUrl.search) {
               callbackUrl += req.nextUrl.search;
          }
          const encodedCallbackUrl = encodeURIComponent(callbackUrl);
          return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl));
     }

     return NextResponse.next();
});

export const config = {
     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
