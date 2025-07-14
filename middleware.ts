import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect logic based on user role
    if (token) {
      // WAITING users should go to waiting room (except if they're already there)
      if (token.role === 'WAITING' && pathname !== '/waiting-room') {
        return NextResponse.redirect(new URL('/waiting-room', req.url));
      }

      // REJECTED users should go to access denied page (except if they're already there)
      if (token.role === 'REJECTED' && pathname !== '/access-denied') {
        return NextResponse.redirect(new URL('/access-denied', req.url));
      }

      // AUTHENTICATED users can't access waiting room or access denied pages
      if (token.role === 'AUTHENTICATED') {
        if (pathname === '/waiting-room' || pathname === '/access-denied') {
          return NextResponse.redirect(new URL('/protected/overview', req.url));
        }
      }
    }

    // If no token and trying to access protected routes, redirect to signup
    if (!token && pathname.startsWith('/protected')) {
      return NextResponse.redirect(new URL('/signup', req.url));
    }

    // If no token and trying to access waiting room or access denied, redirect to signup
    if (!token && (pathname === '/waiting-room' || pathname === '/access-denied')) {
      return NextResponse.redirect(new URL('/signup', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Protect all routes under /protected
        if (pathname.startsWith('/protected')) {
          return token?.role === 'AUTHENTICATED';
        }

        // Protect waiting room - only WAITING users can access
        if (pathname === '/waiting-room') {
          return token?.role === 'WAITING';
        }

        // Protect access denied page - only REJECTED users can access
        if (pathname === '/access-denied') {
          return token?.role === 'REJECTED';
        }

        // Allow access to all other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/protected/:path*', '/waiting-room', '/access-denied']
}; 