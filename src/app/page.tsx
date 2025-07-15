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
    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth < 640;
    const particleCount = isMobile ? 8 : 15;
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
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
      <div className="relative h-screen overflow-hidden min-h-[600px] sm:min-h-screen">
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
          <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Main Title with Advanced Animation */}
            <div className="mb-8 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 sm:mb-8 tracking-tighter leading-none relative font-playfair-display">
                  {/* Glow effect behind text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-800 via-orange-600 to-red-800 -z-10"
                  />
                  
                  {/* Main text with elegant gradient */}
                  <span className="bg-gradient-to-r from-white via-red-100 to-orange-100 bg-clip-text text-transparent font-thin tracking-widest">
                    <AnimatedText text="Laced In Lust" delay={0.5} />
                  </span>
                </h1>

                {/* Decorative elements */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
                  className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto w-48 sm:w-60 md:w-80 rounded-full"
                />
              </motion.div>
            </div>

            {/* Enhanced Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, ...gentleTransition }}
              className="mb-6 sm:mb-8"
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-zinc-300 leading-relaxed font-light max-w-4xl mx-auto px-2 sm:px-0">
                Come one, come all—this show&apos;s a must.<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>Pleasure&apos;s the poison...
              </p>
            </motion.div>
                         {/* Spiced up "Club Lust" - Now the main navigation button */}
             <motion.div
               initial={{ opacity: 0, scale: 0.8, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ delay: 3, duration: 1, type: "spring", stiffness: 180 }}
               className="mb-12 sm:mb-16 flex justify-center"
             >
               <motion.button
                 onClick={handleOpenMenu}
                 whileHover={{ scale: 1.05, y: -3 }}
                 whileTap={{ scale: 0.95 }}
                 className="relative inline-block px-4 sm:px-6 md:px-8 py-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-wider sm:tracking-widest text-transparent bg-gradient-to-r from-red-500 via-pink-400 to-orange-400 bg-clip-text drop-shadow-lg animate-pulse font-playfair-display cursor-pointer transition-all duration-300 hover:animate-none"
               >
                 <span className="absolute -inset-1 blur-2xl opacity-40 bg-gradient-to-r from-red-700 via-pink-500 to-orange-500 rounded-lg -z-10 group-hover:opacity-60 transition-opacity"></span>
                 CLUB&nbsp;LUST
               </motion.button>
             </motion.div>


           </div>
        </div>
      </div>
    </div>
  );
}
