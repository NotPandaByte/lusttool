'use client';

import { motion, Transition } from 'framer-motion';
import Link from 'next/link';

const gentleTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black">

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/30 via-transparent to-slate-900/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center max-w-6xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...gentleTransition }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-none"
            >
              Laced in Lust
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...gentleTransition }}
              className="text-xl md:text-2xl text-zinc-300 mb-12 leading-relaxed font-light max-w-3xl mx-auto"
            >
              Where passion meets rhythm, and every night becomes an unforgettable experience
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, ...gentleTransition }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link href="/events">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-zinc-100 transition-colors duration-200"
                >
                  Explore Events
                </motion.button>
              </Link>
              
              <Link href="/staff">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-zinc-600 text-white rounded-lg font-semibold text-lg hover:border-zinc-500 transition-colors duration-200"
                >
                  Meet Our Team
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="relative py-32 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={gentleTransition}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-slate-300 mb-8 tracking-tight">
                Where Nights Transform
              </h2>
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl mx-auto font-light">
                Experience the perfect fusion of luxury, music, and atmosphere in our 
                <span className="text-white font-medium"> premium nightlife destination</span>
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  ),
                  title: "Immersive Soundscapes",
                  description: "State-of-the-art audio systems and world-renowned DJs creating sonic journeys that pulse through your soul."
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                  title: "Exclusive Experiences",
                  description: "VIP areas, private events, and curated experiences designed for the most discerning night owls."
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  ),
                  title: "Passion & Energy",
                  description: "An atmosphere where desire meets rhythm, creating magnetic connections and unforgettable memories."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, ...gentleTransition }}
                  viewport={{ once: true }}
                  className="p-8 bg-zinc-900/50 rounded-lg border border-zinc-800"
                >
                  <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  
                  <p className="text-zinc-400 leading-relaxed text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hours Section */}
      <div className="relative py-24 bg-gradient-to-r from-zinc-900/10 via-slate-900/10 to-zinc-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={gentleTransition}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-slate-300 mb-12 tracking-tight">
                Join the Night
              </h2>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, ...gentleTransition }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center py-4 border-b border-white/10 last:border-b-0"
                  >
                    <span className="text-xl text-zinc-300 font-medium">Thursday - Saturday</span>
                    <span className="text-xl text-white font-bold">
                      9:00 PM - 3:00 AM
                    </span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, ...gentleTransition }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center py-4"
                  >
                    <span className="text-xl text-zinc-300 font-medium">Sunday - Wednesday</span>
                    <span className="text-xl text-zinc-500 font-semibold">Closed</span>
                  </motion.div>
                </div>
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, ...gentleTransition }}
                viewport={{ once: true }}
                className="text-zinc-400 text-lg"
              >
                Hours may vary during special events and holidays
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
