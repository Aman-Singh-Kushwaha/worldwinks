import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Handle auth using the existing auth middleware
  const authMiddleware = await auth();
  
  // If auth fails, redirect to home page
  if (!authMiddleware) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Continue with the request if auth succeeds
  return NextResponse.next();
}

// Configure middleware to only run on specific paths
export const config = {
  matcher: [
    '/upload/:path*',
    '/feed/:path*',
    '/(protected)/:path*'
  ]
};
