'use client';

import { motion, Transition, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const gentleTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25
};

// Split text animation component
const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const letters = text.split('');
  
  return (
    <span className="inline-block">
      {letters.map((letter, index) => (
        <motion.span
          key={index} 
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + index * 0.03,
            duration: 0.8,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="inline-block"
          style={{ transformOrigin: '50% 50%' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
};

// Floating particles component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      background: [
        "linear-gradient(45deg, rgba(139, 69, 19, 0.1), rgba(165, 42, 42, 0.1))",
        "linear-gradient(225deg, rgba(165, 42, 42, 0.1), rgba(139, 69, 19, 0.1))",
        "linear-gradient(45deg, rgba(139, 69, 19, 0.1), rgba(165, 42, 42, 0.1))",
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

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
          
          {/* Enhanced overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />
          <motion.div 
            className="absolute inset-0"
            animate={controls}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-orange-900/20" />
        </div>

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center max-w-7xl mx-auto px-4">
            
            {/* Main Title with Advanced Animation */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter leading-none relative">
                  {/* Glow effect behind text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-800 via-orange-600 to-red-800 -z-10"
                  />
                  
                  {/* Main text with elegant gradient */}
                  <span className="bg-gradient-to-r from-white via-red-100 to-orange-100 bg-clip-text text-transparent">
                    <AnimatedText text="Laced in Lust" delay={0.5} />
                  </span>
                </h1>

                {/* Decorative elements */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
                  className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto w-80 rounded-full"
                />
              </motion.div>
            </div>

            {/* Enhanced Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, ...gentleTransition }}
              className="mb-16"
            >
              <p className="text-xl md:text-3xl text-zinc-300 leading-relaxed font-light max-w-4xl mx-auto">
                Where passion meets rhythm, and every night becomes an{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-medium">
                  unforgettable experience
                </span>
              </p>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, ...gentleTransition }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              <Link href="/events">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden border border-red-600/50"
                >
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    animate={{
                      background: [
                        "linear-gradient(45deg, #dc2626, #ea580c)",
                        "linear-gradient(225deg, #ea580c, #dc2626)",
                        "linear-gradient(45deg, #dc2626, #ea580c)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={false}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Events
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                </motion.button>
              </Link>
              
              <Link href="/staff">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-5 bg-black/50 backdrop-blur-sm border-2 border-orange-600/60 text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
                >
                  {/* Border glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(234, 88, 12, 0.3)",
                        "0 0 40px rgba(220, 38, 38, 0.3)",
                        "0 0 20px rgba(234, 88, 12, 0.3)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    Meet Our Team
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </motion.svg>
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white/50 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="relative py-32 bg-gradient-to-b from-black via-red-950/20 to-black">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(165, 42, 42, 0.1), transparent)",
                "radial-gradient(circle at 80% 50%, rgba(234, 88, 12, 0.1), transparent)",
                "radial-gradient(circle at 20% 50%, rgba(165, 42, 42, 0.1), transparent)",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={gentleTransition}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-orange-100 mb-8 tracking-tight">
                Where Nights Transform
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto w-48 rounded-full mb-8"
              />
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl mx-auto font-light">
                Experience the perfect fusion of luxury, music, and atmosphere in our 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-medium"> premium nightlife destination</span>
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  ),
                  title: "Immersive Soundscapes",
                  description: "State-of-the-art audio systems and world-renowned DJs creating sonic journeys that pulse through your soul.",
                  gradient: "from-red-600/20 to-red-800/20"
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                  title: "Exclusive Experiences",
                  description: "VIP areas, private events, and curated experiences designed for the most discerning night owls.",
                  gradient: "from-orange-600/20 to-red-700/20"
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  ),
                  title: "Passion & Energy",
                  description: "An atmosphere where desire meets rhythm, creating magnetic connections and unforgettable memories.",
                  gradient: "from-red-700/20 to-orange-600/20"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, ...gentleTransition }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative p-8 backdrop-blur-sm rounded-2xl border border-red-900/30 overflow-hidden"
                >
                  {/* Card background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
                  
                  {/* Card glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(220, 38, 38, 0.2)",
                        "0 0 30px rgba(234, 88, 12, 0.2)",
                        "0 0 20px rgba(220, 38, 38, 0.2)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-6 border border-red-800/50"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-white mb-4 text-center group-hover:text-red-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-zinc-400 leading-relaxed text-center group-hover:text-zinc-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hours Section */}
      <div className="relative py-24 bg-gradient-to-r from-red-950/10 via-black to-orange-950/10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 30% 40%, rgba(220, 38, 38, 0.1), transparent)",
                "radial-gradient(circle at 70% 60%, rgba(234, 88, 12, 0.1), transparent)",
                "radial-gradient(circle at 30% 40%, rgba(220, 38, 38, 0.1), transparent)",
              ]
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={gentleTransition}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-orange-100 mb-8 tracking-tight">
                Join the Night
              </h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto w-32 rounded-full mb-12"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, ...gentleTransition }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Glass card with enhanced styling */}
                <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-red-900/30 mb-8 relative overflow-hidden">
                  {/* Card background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-orange-950/20" />
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-50"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(220, 38, 38, 0.2)",
                        "0 0 50px rgba(234, 88, 12, 0.2)",
                        "0 0 30px rgba(220, 38, 38, 0.2)",
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <div className="relative z-10 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, ...gentleTransition }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center py-6 border-b border-red-900/30"
                    >
                      <span className="text-xl text-zinc-300 font-medium">Thursday - Saturday</span>
                      <motion.span 
                        className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 font-bold"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        9:00 PM - 3:00 AM
                      </motion.span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, ...gentleTransition }}
                      viewport={{ once: true }}
                      className="flex justify-between items-center py-6"
                    >
                      <span className="text-xl text-zinc-300 font-medium">Sunday - Wednesday</span>
                      <span className="text-xl text-zinc-500 font-semibold">Closed</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1, ...gentleTransition }}
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
