import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Additional middleware logic if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all routes under /protected
        if (req.nextUrl.pathname.startsWith('/protected')) {
          return token?.role === 'AUTHENTICATED';
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/protected/:path*']
}; 