// middleware.ts
/*
import { NextResponse } from 'next/server';
import { auth } from './lib/firebase';

export async function middleware(request) {
  // For API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Handle API auth checks
  }

  // For admin pages
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = await request.cookies.get('__session')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      await auth.verifyIdToken(token);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
}
*/
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect /admin routes only
  if (request.nextUrl.pathname.startsWith("/admin") && !session?.user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!auth/callback).*)"], // protect everything EXCEPT /auth/callback
};
