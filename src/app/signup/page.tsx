'use client';

import { signIn } from 'next-auth/react';
import { motion, Transition } from 'framer-motion';

const smoothTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

const gentleTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25
};

export default function SignupPage() {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

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
          <h2 className="text-4xl font-bold text-white mb-8">
            Staff Login
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ...gentleTransition }}
          className="glass rounded-2xl p-8 glow-subtle"
        >
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...gentleTransition }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            className="group relative w-full flex justify-center items-center py-4 px-6 border border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-xl animate-smooth font-medium btn-hover"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <motion.svg 
              className="w-6 h-6 mr-3 z-10" 
              viewBox="0 0 24 24"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={smoothTransition}
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </motion.svg>
            <span className="z-10">Continue with Google</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
} 