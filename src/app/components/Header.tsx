'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Listen for custom event from homepage
  useEffect(() => {
    if (!isClient) return;

    const handleOpenHeaderModal = () => {
      setIsMenuOpen(true);
    };

    window.addEventListener('openHeaderModal', handleOpenHeaderModal);
    return () => {
      window.removeEventListener('openHeaderModal', handleOpenHeaderModal);
    };
  }, [isClient]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!isClient) return;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isClient]);

  // Don't render anything until we're on the client
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Floating Hamburger Icon */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        onClick={toggleMenu}
        className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[70] 
                   w-12 h-12 sm:w-16 sm:h-16
                   bg-black/30 backdrop-blur-md hover:bg-red-950/40 
                   rounded-full flex items-center justify-center group 
                   border-2 border-red-800/40 hover:border-orange-600/60
                   shadow-lg shadow-black/20
                   transition-all duration-300 ease-out
                   cursor-pointer"
      >
        <div className="relative w-5 h-5 sm:w-7 sm:h-7 z-10">
          <motion.span
            animate={isMenuOpen ? 
              { rotate: 45, y: 0, opacity: 1 } : 
              { rotate: 0, y: -6, opacity: 1 }
            }
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-0 top-1/2 w-full h-0.5 sm:h-1 
                       bg-white transform -translate-y-1/2 origin-center
                       shadow-sm shadow-black/30 rounded-full"
          />
          <motion.span
            animate={isMenuOpen ? 
              { opacity: 0, scale: 0 } : 
              { opacity: 1, scale: 1 }
            }
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-0 top-1/2 w-full h-0.5 sm:h-1 
                       bg-white transform -translate-y-1/2
                       shadow-sm shadow-black/30 rounded-full"
          />
          <motion.span
            animate={isMenuOpen ? 
              { rotate: -45, y: 0, opacity: 1 } : 
              { rotate: 0, y: 6, opacity: 1 }
            }
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-0 top-1/2 w-full h-0.5 sm:h-1 
                       bg-white transform -translate-y-1/2 origin-center
                       shadow-sm shadow-black/30 rounded-full"
          />
        </div>
      </motion.button>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-2xl flex flex-col"
            onClick={closeMenu}
          >
            {/* Scrollable Content Container */}
            <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden">
              <div className="min-h-full">
                {/* Content Wrapper */}
                <div className="px-4 py-6 sm:py-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 }}
                    className="w-full max-w-6xl mx-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Menu Header */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-center mb-6 sm:mb-12"
                    >
                      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-orange-100 tracking-wide mb-3 sm:mb-4 drop-shadow-lg">
                        Navigation
                      </h2>
                      <p className="text-zinc-300 text-sm sm:text-lg lg:text-xl font-medium drop-shadow-md">
                        Explore our world
                      </p>
                    </motion.div>

                    {/* Navigation Links - Responsive Grid */}
                    <div className="space-y-5 sm:space-y-8">
                      {/* Main Navigation - Row 1: Home, Events, Gallery (4 per row on large screens) */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {/* Home */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Link
                            href="/"
                            onClick={closeMenu}
                            className="block p-3 sm:p-6 lg:p-8 text-center group hover:bg-red-950/20 rounded-xl transition-all duration-300 border border-red-900/30 hover:border-red-700/50 backdrop-blur-sm"
                          >
                            <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-4 bg-red-950/30 border border-red-800/40 rounded-full flex items-center justify-center group-hover:bg-red-900/40 group-hover:border-orange-600/50 transition-all duration-300 shadow-xl">
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-lg lg:text-xl drop-shadow-md group-hover:text-red-100 transition-colors duration-300">Home</span>
                          </Link>
                        </motion.div>

                        {/* Events */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          <Link
                            href="/events"
                            onClick={closeMenu}
                            className="block p-4 sm:p-6 lg:p-8 text-center group hover:bg-red-950/20 rounded-xl transition-all duration-300 border border-red-900/30 hover:border-red-700/50 backdrop-blur-sm"
                          >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 bg-red-950/30 border border-red-800/40 rounded-full flex items-center justify-center group-hover:bg-red-900/40 group-hover:border-orange-600/50 transition-all duration-300 shadow-xl">
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-orange-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-lg lg:text-xl drop-shadow-md group-hover:text-orange-100 transition-colors duration-300">Events</span>
                          </Link>
                        </motion.div>

                        {/* Gallery */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Link
                            href="/event-pictures"
                            onClick={closeMenu}
                            className="block p-4 sm:p-6 lg:p-8 text-center group hover:bg-red-950/20 rounded-xl transition-all duration-300 border border-red-900/30 hover:border-red-700/50 backdrop-blur-sm"
                          >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 bg-red-950/30 border border-red-800/40 rounded-full flex items-center justify-center group-hover:bg-red-900/40 group-hover:border-orange-600/50 transition-all duration-300 shadow-xl">
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-lg lg:text-xl drop-shadow-md group-hover:text-red-100 transition-colors duration-300">Gallery</span>
                          </Link>
                        </motion.div>

                        {/* Our Staff - Large screens in first row, small mobile next to Gallery */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                          className="hidden sm:hidden lg:block"
                        >
                          <Link
                            href="/staff"
                            onClick={closeMenu}
                            className="block p-4 sm:p-6 lg:p-8 text-center group hover:bg-red-950/20 rounded-xl transition-all duration-300 border border-red-900/30 hover:border-red-700/50 backdrop-blur-sm"
                          >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 bg-red-950/30 border border-red-800/40 rounded-full flex items-center justify-center group-hover:bg-red-900/40 group-hover:border-orange-600/50 transition-all duration-300 shadow-xl">
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 715 0z" />
                              </svg>
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-lg lg:text-xl drop-shadow-md group-hover:text-red-100 transition-colors duration-300">Our Staff</span>
                          </Link>
                        </motion.div>

                        {/* Our Staff - Small mobile only, positioned next to Gallery */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                          className="block sm:hidden"
                        >
                          <Link
                            href="/staff"
                            onClick={closeMenu}
                            className="block p-3 text-center group hover:bg-red-950/20 rounded-xl transition-all duration-300 border border-red-900/30 hover:border-red-700/50 backdrop-blur-sm"
                          >
                            <div className="w-10 h-10 mx-auto mb-2 bg-red-950/30 border border-red-800/40 rounded-full flex items-center justify-center group-hover:bg-red-900/40 group-hover:border-orange-600/50 transition-all duration-300 shadow-xl">
                              <svg className="w-5 h-5 text-red-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 715 0z" />
                              </svg>
                            </div>
                            <span className="text-white font-semibold text-sm drop-shadow-md group-hover:text-red-100 transition-colors duration-300">Our Staff</span>
                          </Link>
                        </motion.div>
                      </div>

                      {/* Main Navigation - Row 2: Our Staff, VIPs, Contact */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        {/* Our Staff - Mobile and tablet only */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="hidden sm:block lg:hidden"
                        >
                          <Link
                            href="/staff"
                            onClick={closeMenu}
                            className="block p-3 sm:p-6 lg:p-8 text-center group hover:bg-red-950/20 rounded-xl transition-all duration-300 border border-red-900/30 hover:border-red-700/50 backdrop-blur-sm"
                          >
                            <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-4 bg-red-950/30 border border-red-800/40 rounded-full flex items-center justify-center group-hover:bg-red-900/40 group-hover:border-orange-600/50 transition-all duration-300 shadow-xl">
                              <svg className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                              </svg>
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-lg lg:text-xl drop-shadow-md group-hover:text-red-100 transition-colors duration-300">Our Staff</span>
                          </Link>
                        </motion.div>

                        {/* VIPs */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 }}
                          className="col-start-1 sm:col-start-2 lg:col-start-2"
                        >
                          <Link
                            href="/vips"
                            onClick={closeMenu}
                            className="block p-3 sm:p-6 lg:p-8 text-center group hover:bg-red-950/20 rounded-xl transition-all duration-300 border border-red-900/30 hover:border-red-700/50 backdrop-blur-sm"
                          >
                            <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-4 bg-red-950/30 border border-red-800/40 rounded-full flex items-center justify-center group-hover:bg-red-900/40 group-hover:border-orange-600/50 transition-all duration-300 shadow-xl">
                              <svg className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-orange-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-lg lg:text-xl drop-shadow-md group-hover:text-orange-100 transition-colors duration-300">VIPs</span>
                          </Link>
                        </motion.div>

                        {/* Contact */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="col-start-2 sm:col-start-3 lg:col-start-3"
                        >
                          <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="block p-3 sm:p-6 lg:p-8 text-center group hover:bg-red-950/20 rounded-xl transition-all duration-300 border border-red-900/30 hover:border-red-700/50 backdrop-blur-sm"
                          >
                            <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-4 bg-red-950/30 border border-red-800/40 rounded-full flex items-center justify-center group-hover:bg-red-900/40 group-hover:border-orange-600/50 transition-all duration-300 shadow-xl">
                              <svg className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-white font-semibold text-sm sm:text-lg lg:text-xl drop-shadow-md group-hover:text-red-100 transition-colors duration-300">Contact</span>
                          </Link>
                        </motion.div>
                      </div>

                                             {/* Smaller Secondary Navigation - Terms, Privacy, About */}
                       <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-red-900/20">
                         <div className="text-center mb-3 sm:mb-4">
                           <p className="text-zinc-400 text-xs sm:text-sm font-medium">Legal & Information</p>
                         </div>
                         <div className="flex justify-center">
                           <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
                          {/* Terms of Service */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                          >
                            <Link
                              href="/terms-of-service"
                              onClick={closeMenu}
                              className="block p-3 sm:p-4 text-center group hover:bg-red-950/15 rounded-lg transition-all duration-300 border border-red-900/20 hover:border-red-700/40 backdrop-blur-sm"
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 bg-red-950/20 border border-red-800/30 rounded-full flex items-center justify-center group-hover:bg-red-900/30 group-hover:border-orange-600/40 transition-all duration-300">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <span className="text-white font-medium text-xs sm:text-sm drop-shadow-md group-hover:text-orange-100 transition-colors duration-300">Terms</span>
                            </Link>
                          </motion.div>

                          {/* Privacy Policy */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <Link
                              href="/privacy-policy"
                              onClick={closeMenu}
                              className="block p-3 sm:p-4 text-center group hover:bg-red-950/15 rounded-lg transition-all duration-300 border border-red-900/20 hover:border-red-700/40 backdrop-blur-sm"
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 bg-red-950/20 border border-red-800/30 rounded-full flex items-center justify-center group-hover:bg-red-900/30 group-hover:border-orange-600/40 transition-all duration-300">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </div>
                              <span className="text-white font-medium text-xs sm:text-sm drop-shadow-md group-hover:text-red-100 transition-colors duration-300">Privacy</span>
                            </Link>
                          </motion.div>

                          {/* About */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 }}
                          >
                            <Link
                              href="/about"
                              onClick={closeMenu}
                              className="block p-3 sm:p-4 text-center group hover:bg-red-950/15 rounded-lg transition-all duration-300 border border-red-900/20 hover:border-red-700/40 backdrop-blur-sm"
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 bg-red-950/20 border border-red-800/30 rounded-full flex items-center justify-center group-hover:bg-red-900/30 group-hover:border-orange-600/40 transition-all duration-300">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                                                             <span className="text-white font-medium text-xs sm:text-sm drop-shadow-md group-hover:text-orange-100 transition-colors duration-300">About</span>
                             </Link>
                           </motion.div>
                           </div>
                         </div>
                       </div>

                      {/* Staff Dashboard Section - Only for authenticated staff */}
                      {session?.user?.role === 'AUTHENTICATED' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-red-900/30"
                        >
                          <div className="text-center mb-6 sm:mb-8">
                            <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-2">
                              Staff Dashboard
                            </h3>
                            <p className="text-zinc-400 text-xs sm:text-sm">Management & Administration</p>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {/* User Approvals */}
                            <Link
                              href="/protected/staff-admin"
                              onClick={closeMenu}
                              className="p-3 sm:p-4 bg-red-950/30 border border-red-800/40 rounded-lg text-center hover:bg-red-900/40 hover:border-orange-600/50 transition-all duration-300 backdrop-blur-sm"
                            >
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-white font-medium text-xs sm:text-sm">User Approvals</span>
                            </Link>

                            {/* Staff Management */}
                            <Link
                              href="/protected/staff-management"
                              onClick={closeMenu}
                              className="p-3 sm:p-4 bg-red-950/30 border border-red-800/40 rounded-lg text-center hover:bg-red-900/40 hover:border-orange-600/50 transition-all duration-300 backdrop-blur-sm"
                            >
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span className="text-white font-medium text-xs sm:text-sm">Staff Management</span>
                            </Link>

                            {/* Support TODO */}
                            <Link
                              href="/protected/support"
                              onClick={closeMenu}
                              className="p-3 sm:p-4 bg-red-950/30 border border-red-800/40 rounded-lg text-center hover:bg-red-900/40 hover:border-orange-600/50 transition-all duration-300 backdrop-blur-sm"
                            >
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                              </svg>
                              <span className="text-white font-medium text-xs sm:text-sm">Support TODO</span>
                            </Link>

                            {/* Upcoming Planning */}
                            <Link
                              href="/protected/planning"
                              onClick={closeMenu}
                              className="p-3 sm:p-4 bg-red-950/30 border border-red-800/40 rounded-lg text-center hover:bg-red-900/40 hover:border-orange-600/50 transition-all duration-300 backdrop-blur-sm"
                            >
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              <span className="text-white font-medium text-xs sm:text-sm">Upcoming Planning</span>
                            </Link>

                            {/* Dancer Management */}
                            <Link
                              href="/protected/dancer-management"
                              onClick={closeMenu}
                              className="p-3 sm:p-4 bg-red-950/30 border border-red-800/40 rounded-lg text-center hover:bg-red-900/40 hover:border-orange-600/50 transition-all duration-300 backdrop-blur-sm"
                            >
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="text-white font-medium text-xs sm:text-sm">Dancer Management</span>
                            </Link>

                            {/* Overview */}
                            <Link
                              href="/protected/overview"
                              onClick={closeMenu}
                              className="p-3 sm:p-4 bg-red-950/30 border border-red-800/40 rounded-lg text-center hover:bg-red-900/40 hover:border-orange-600/50 transition-all duration-300 backdrop-blur-sm"
                            >
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              <span className="text-white font-medium text-xs sm:text-sm">Overview</span>
                            </Link>
                          </div>

                          {/* Sign Out Button */}
                          <div className="mt-4 sm:mt-6 text-center">
                            <button
                              onClick={() => {
                                signOut();
                                closeMenu();
                              }}
                              className="px-4 sm:px-6 py-2 sm:py-3 bg-black/30 border border-red-900/50 text-white rounded-lg font-medium hover:bg-red-950/30 hover:border-red-700/70 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                            >
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* Waiting Room (for users with waiting status) */}
                      {session?.user?.role === 'WAITING' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-red-900/30"
                        >
                          <div className="text-center">
                            <Link
                              href="/waiting-room"
                              onClick={closeMenu}
                              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg text-sm sm:text-base"
                            >
                              Waiting Room
                            </Link>
                          </div>
                        </motion.div>
                      )}

                      {/* Staff Login Section - Separate and Less Prominent */}
                      {!session && status !== 'loading' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="mt-12 sm:mt-20 pt-6 sm:pt-8"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <p className="text-zinc-500 text-xs sm:text-sm mb-3 sm:mb-4 font-medium">Staff Members</p>
                            <Link
                              href="/signup"
                              onClick={closeMenu}
                              className="px-4 sm:px-6 py-2 sm:py-3 bg-black/20 border border-red-900/40 text-zinc-400 rounded-lg font-medium hover:bg-red-950/20 hover:border-red-800/60 hover:text-zinc-300 transition-all duration-300 backdrop-blur-sm text-xs sm:text-sm"
                            >
                              Staff Login
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 