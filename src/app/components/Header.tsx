'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { useState } from 'react';

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

export default function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Floating Hamburger Icon */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          boxShadow: [
            "0 0 20px rgba(255, 255, 255, 0.1)",
            "0 0 30px rgba(255, 255, 255, 0.2)",
            "0 0 20px rgba(255, 255, 255, 0.1)"
          ]
        }}
        transition={{ 
          delay: 0.5, 
          ...smoothTransition,
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 40px rgba(255, 255, 255, 0.3)"
        }}
        onClick={toggleMenu}
        className="fixed top-8 right-8 z-[70] 
                   w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20
                   bg-white/15 backdrop-blur-md hover:bg-white/25 
                   rounded-full focus-ring scale-hover 
                   flex items-center justify-center group 
                   border-2 border-white/30 hover:border-white/50
                   shadow-lg shadow-black/20
                   transition-all duration-300 ease-out
                   cursor-pointer
                   before:absolute before:inset-0 before:rounded-full 
                   before:bg-gradient-to-br before:from-white/5 before:to-transparent
                   after:absolute after:inset-0 after:rounded-full 
                   after:bg-gradient-to-t after:from-black/10 after:to-transparent"
      >
        <div className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 z-10">
          <motion.span
            animate={isMenuOpen ? 
              { rotate: 45, y: 0, opacity: 1 } : 
              { rotate: 0, y: -8, opacity: 1 }
            }
            transition={smoothTransition}
            className="absolute left-0 top-1/2 w-full h-0.5 sm:h-1 
                       bg-white transform -translate-y-1/2 origin-center
                       shadow-sm shadow-black/30 rounded-full"
          />
          <motion.span
            animate={isMenuOpen ? 
              { opacity: 0, scale: 0 } : 
              { opacity: 1, scale: 1 }
            }
            transition={smoothTransition}
            className="absolute left-0 top-1/2 w-full h-0.5 sm:h-1 
                       bg-white transform -translate-y-1/2
                       shadow-sm shadow-black/30 rounded-full"
          />
          <motion.span
            animate={isMenuOpen ? 
              { rotate: -45, y: 0, opacity: 1 } : 
              { rotate: 0, y: 8, opacity: 1 }
            }
            transition={smoothTransition}
            className="absolute left-0 top-1/2 w-full h-0.5 sm:h-1 
                       bg-white transform -translate-y-1/2 origin-center
                       shadow-sm shadow-black/30 rounded-full"
          />
        </div>
        
        {/* Larger invisible clickable area for easier interaction */}
        <div className="absolute inset-0 -m-4 rounded-full" />
      </motion.button>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
            className="fixed inset-0 z-[60] 
                       bg-white/20 backdrop-blur-2xl
                       flex items-center justify-center"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, ...gentleTransition }}
              className="max-w-7xl w-full mx-6 py-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, ...gentleTransition }}
                className="text-center mb-16"
              >
                <h2 className="text-6xl font-bold text-white tracking-wide mb-6 drop-shadow-lg">
                  Navigation
                </h2>
                <p className="text-white/90 text-2xl font-medium drop-shadow-md">
                  Explore our world
                </p>
              </motion.div>

              {/* Navigation Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Home */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ...gentleTransition }}
                >
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block p-10 text-center group hover:bg-white/15 rounded-xl transition-all duration-300 border border-white/15 hover:border-white/30"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/25 rounded-full flex items-center justify-center group-hover:bg-white/35 transition-colors shadow-xl">
                      <svg className="w-10 h-10 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-xl drop-shadow-md">Home</span>
                  </Link>
                </motion.div>

                {/* Events */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, ...gentleTransition }}
                >
                  <Link
                    href="/events"
                    onClick={closeMenu}
                    className="block p-10 text-center group hover:bg-white/15 rounded-xl transition-all duration-300 border border-white/15 hover:border-white/30"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/25 rounded-full flex items-center justify-center group-hover:bg-white/35 transition-colors shadow-xl">
                      <svg className="w-10 h-10 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-xl drop-shadow-md">Events</span>
                  </Link>
                </motion.div>

                {/* Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, ...gentleTransition }}
                >
                  <Link
                    href="/gallery"
                    onClick={closeMenu}
                    className="block p-10 text-center group hover:bg-white/15 rounded-xl transition-all duration-300 border border-white/15 hover:border-white/30"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/25 rounded-full flex items-center justify-center group-hover:bg-white/35 transition-colors shadow-xl">
                      <svg className="w-10 h-10 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-xl drop-shadow-md">Gallery</span>
                  </Link>
                </motion.div>

                {/* About */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, ...gentleTransition }}
                >
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className="block p-10 text-center group hover:bg-white/15 rounded-xl transition-all duration-300 border border-white/15 hover:border-white/30"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/25 rounded-full flex items-center justify-center group-hover:bg-white/35 transition-colors shadow-xl">
                      <svg className="w-10 h-10 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-xl drop-shadow-md">About</span>
                  </Link>
                </motion.div>

                {/* Staff */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, ...gentleTransition }}
                >
                  <Link
                    href="/staff"
                    onClick={closeMenu}
                    className="block p-10 text-center group hover:bg-white/15 rounded-xl transition-all duration-300 border border-white/15 hover:border-white/30"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/25 rounded-full flex items-center justify-center group-hover:bg-white/35 transition-colors shadow-xl">
                      <svg className="w-10 h-10 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-xl drop-shadow-md">Our Staff</span>
                  </Link>
                </motion.div>

                {/* Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, ...gentleTransition }}
                >
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="block p-10 text-center group hover:bg-white/15 rounded-xl transition-all duration-300 border border-white/15 hover:border-white/30"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/25 rounded-full flex items-center justify-center group-hover:bg-white/35 transition-colors shadow-xl">
                      <svg className="w-10 h-10 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-xl drop-shadow-md">Contact</span>
                  </Link>
                </motion.div>

                {/* FAQ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, ...gentleTransition }}
                >
                  <Link
                    href="/faq"
                    onClick={closeMenu}
                    className="block p-10 text-center group hover:bg-white/15 rounded-xl transition-all duration-300 border border-white/15 hover:border-white/30"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/25 rounded-full flex items-center justify-center group-hover:bg-white/35 transition-colors shadow-xl">
                      <svg className="w-10 h-10 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-xl drop-shadow-md">FAQ</span>
                  </Link>
                </motion.div>

                {/* Staff Login */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, ...gentleTransition }}
                >
                  <Link
                    href={session?.user?.role === 'AUTHENTICATED' ? '/protected/dashboard' : '/signup'}
                    onClick={closeMenu}
                    className="block p-10 text-center group hover:bg-white/15 rounded-xl transition-all duration-300 border border-white/15 hover:border-white/30"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/25 rounded-full flex items-center justify-center group-hover:bg-white/35 transition-colors shadow-xl">
                      <svg className="w-10 h-10 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-white font-semibold text-xl drop-shadow-md">
                      {session?.user?.role === 'AUTHENTICATED' ? 'Dashboard' : 'Staff Login'}
                    </span>
                  </Link>
                </motion.div>
              </div>

              {/* Sign Out (if authenticated) */}
              {status === 'authenticated' && session?.user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, ...gentleTransition }}
                  className="mt-16 pt-10 border-t border-white/30"
                >
                  <button
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                    className="w-full p-8 text-center text-white/90 hover:text-white hover:bg-white/15 rounded-xl transition-all duration-300 border border-white/25 hover:border-white/40"
                  >
                    <div className="flex items-center justify-center space-x-6">
                      <svg className="w-8 h-8 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-semibold text-2xl drop-shadow-md">Sign Out</span>
                    </div>
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 