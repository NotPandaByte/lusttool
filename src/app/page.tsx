'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import Image from 'next/image';

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

const heroImages = [
  '/VRChat_2025-07-10_21-50-14.341_3840x2160.png',
  '/VRChat_2025-07-10_21-19-00.631_3840x2160.png',
  '/VRChat_2025-07-10_21-06-34.174_3840x2160.png',
  '/VRChat_2025-07-10_21-06-26.953_3840x2160.png'
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImage]}
              alt="Club atmosphere"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...gentleTransition }}
              className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tight leading-none"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.7)' }}
            >
              Laced in lust
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, ...gentleTransition }}
              className="text-2xl md:text-3xl text-white/95 mb-12 leading-relaxed font-light max-w-3xl mx-auto"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              Indulge your senses in a night of passion, music, and unforgettable energy at Laced in Lust.
            </motion.p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={gentleTransition}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                Where Nights Come Alive
              </h2>
              <p className="text-2xl md:text-3xl text-zinc-300 leading-relaxed max-w-4xl mx-auto font-light">
                Step into a world of sophisticated entertainment, premium experiences, 
                and unforgettable moments. Our venue combines luxury with excitement 
                to create the perfect atmosphere for your night out.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ...gentleTransition }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Premium Music</h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  World-class DJs and cutting-edge sound systems that deliver an unparalleled audio experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ...gentleTransition }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Exclusive Events</h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Private parties, VIP experiences, and special events that create lasting memories.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ...gentleTransition }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">Luxury Atmosphere</h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Sophisticated design and premium amenities for the ultimate nightlife experience.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Hours Section */}
      <div className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={gentleTransition}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">Visit Us</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-xl text-zinc-300 font-medium">Thursday - Saturday</span>
                  <span className="text-xl text-white font-semibold">9:00 PM - 3:00 AM</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/20">
                  <span className="text-xl text-zinc-300 font-medium">Sunday - Wednesday</span>
                  <span className="text-xl text-white font-semibold">Closed</span>
                </div>
              </div>
              <p className="text-zinc-400 mt-12 text-lg leading-relaxed">
                Hours may vary during special events and holidays
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
