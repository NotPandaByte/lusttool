'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup');
    } else if (status === 'authenticated' && session?.user?.role === 'AUTHENTICATED') {
      router.push('/protected/overview');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Redirecting...</div>
    </div>
  );
} 