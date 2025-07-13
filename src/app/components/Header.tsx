'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            LustTool
          </Link>
          <nav className="flex items-center space-x-4">
            {status === 'loading' && (
              <span className="text-sm">Loading...</span>
            )}
            {status === 'authenticated' && session?.user && (
              <>
                {session.user.role === 'AUTHENTICATED' && (
                  <Link
                    href="/protected/dashboard"
                    className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <span className="text-sm">
                  Welcome, {session.user.name}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  session.user.role === 'AUTHENTICATED' 
                    ? 'bg-green-500' 
                    : 'bg-yellow-500'
                }`}>
                  {session.user.role}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Sign Out
                </button>
              </>
            )}
            {status === 'unauthenticated' && (
              <Link 
                href="/signup" 
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 