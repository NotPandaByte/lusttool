'use client';

import { motion, Transition, useAnimation } from 'framer-motion';
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

  const handleOpenMenu = () => {
    // Trigger the header menu/modal
    const event = new CustomEvent('openHeaderModal');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Full Screen */}
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
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-none relative font-playfair-display">
                  {/* Glow effect behind text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-800 via-orange-600 to-red-800 -z-10"
                  />
                  
                  {/* Main text with elegant gradient */}
                  <span className="bg-gradient-to-r from-white via-red-100 to-orange-100 bg-clip-text text-transparent font-black tracking-tight">
                    <AnimatedText text="Laced In Lust" delay={0.5} />
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
              Come one, come all—this show’s a must. Pleasure’s the poison at Club Lust.
              </p>
            </motion.div>

            {/* Single CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, ...gentleTransition }}
              className="flex items-center justify-center"
            >
              <motion.button
                onClick={handleOpenMenu}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-2xl font-bold text-xl shadow-2xl overflow-hidden border border-red-600/50"
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
                
                <span className="relative z-10 flex items-center gap-4">
                  Enter Club Lust
                  <motion.svg
                    className="w-6 h-6"
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
            </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
}
