'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion, Transition } from 'framer-motion';

const gentleTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25
};

export default function WaitingRoomPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/signup');
    } else if (status === 'authenticated') {
      // If user is authenticated, redirect to dashboard
      if (session?.user?.role === 'AUTHENTICATED') {
        router.push('/protected/dashboard');
      } else if (session?.user?.role === 'REJECTED') {
        router.push('/access-denied');
      }
      // If role is WAITING, stay on this page
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect to signup
  }

  if (session?.user?.role === 'REJECTED') {
    return null; // Will redirect to access denied
  }

  if (session?.user?.role === 'AUTHENTICATED') {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={gentleTransition}
        className="max-w-md w-full space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ...gentleTransition }}
          className="text-center"
        >
          <div className="mx-auto w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-8">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Application Pending
          </h2>
          <p className="text-zinc-300 text-lg mb-8">
            Your staff application is currently being reviewed by our team.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, ...gentleTransition }}
          className="glass rounded-2xl p-8 glow-subtle"
        >
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-300 font-medium">Awaiting Review</span>
              </div>
              
              <div className="text-zinc-400 text-sm space-y-2">
                <p>
                  <strong className="text-white">Account Status:</strong> Pending Approval
                </p>
                <p>
                  <strong className="text-white">Signed in as:</strong> {session?.user?.name || 'Staff Member'}
                </p>
                <p>
                  <strong className="text-white">Email:</strong> {session?.user?.email}
                </p>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-white font-semibold mb-3">What happens next?</h3>
              <div className="text-zinc-400 text-sm space-y-2 text-left">
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 mt-1">1.</span>
                  <span>Your application will be reviewed by our admin team</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 mt-1">2.</span>
                  <span>You&apos;ll receive approval or feedback via email</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 mt-1">3.</span>
                  <span>Once approved, you&apos;ll have access to the staff dashboard</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <p className="text-zinc-500 text-xs">
                Review times may vary. You can safely close this page and return later.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ...gentleTransition }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm underline"
          >
            Return to Homepage
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
} 