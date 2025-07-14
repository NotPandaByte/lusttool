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

export default function AccessDeniedPage() {
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
      } else if (session?.user?.role === 'WAITING') {
        router.push('/waiting-room');
      }
      // If role is REJECTED, stay on this page
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

  if (session?.user?.role === 'AUTHENTICATED') {
    return null; // Will redirect to dashboard
  }

  if (session?.user?.role === 'WAITING') {
    return null; // Will redirect to waiting room
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
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-8">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Access Denied
          </h2>
          <p className="text-zinc-300 text-lg mb-8">
            Unfortunately, your staff application has been declined.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, ...gentleTransition }}
          className="glass rounded-2xl p-8 glow-subtle border-red-500/20"
        >
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-red-300 font-medium">Application Rejected</span>
              </div>
              
              <div className="text-zinc-400 text-sm space-y-2">
                <p>
                  <strong className="text-white">Account Status:</strong> Access Denied
                </p>
                <p>
                  <strong className="text-white">Signed in as:</strong> {session?.user?.name || 'User'}
                </p>
                <p>
                  <strong className="text-white">Email:</strong> {session?.user?.email}
                </p>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-white font-semibold mb-3">What can you do?</h3>
              <div className="text-zinc-400 text-sm space-y-2 text-left">
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>You can still browse the public areas of our site</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Contact our admin team if you believe this is an error</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>You may reapply in the future if circumstances change</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <p className="text-zinc-500 text-xs">
                If you have questions about this decision, please contact our support team.
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