'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Welcome to LustTool
        </h1>
        
        {session?.user ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Hello, {session.user.name}!
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Email:</span>
                <span className="font-medium">{session.user.email}</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  session.user.role === 'AUTHENTICATED' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {session.user.role}
                </span>
              </div>
              
              {session.user.role === 'WAITING' && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-blue-800 text-sm">
                    Your account is currently in waiting status. Please wait for an administrator to approve your account.
                  </p>
                </div>
              )}
              
              {session.user.role === 'AUTHENTICATED' && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-green-800 text-sm">
                    🎉 Your account has been approved! You now have full access to the platform.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              Please sign up to access the platform.
            </p>
            <Link 
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
