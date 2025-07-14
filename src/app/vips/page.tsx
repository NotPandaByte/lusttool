'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

// Empty array - no fake users
const vipMembers: any[] = [];

export default function VIPsPage() {
  const [selectedVIP, setSelectedVIP] = useState<number | null>(null);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'from-gray-300 via-gray-100 to-gray-300';
      case 'Gold':
        return 'from-yellow-400 via-yellow-200 to-yellow-400';
      case 'Diamond':
        return 'from-blue-300 via-white to-blue-300';
      default:
        return 'from-red-400 via-orange-300 to-red-400';
    }
  };

  const getTierBorderColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'border-gray-300/50';
      case 'Gold':
        return 'border-yellow-400/50';
      case 'Diamond':
        return 'border-blue-300/50';
      default:
        return 'border-red-400/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm2.7-2h8.6l.9-4.4L14 12l-2-3.5L10 12l-3.2-2.4L7.7 14z"/>
              </svg>
            </motion.div>
            
            {/* Floating particles around crown */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full"
            />
            <motion.div
              animate={{
                y: [10, -10, 10],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-orange-400 rounded-full"
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: [0.175, 0.885, 0.32, 1.275]
            }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 drop-shadow-lg">
              Our Elite VIPs
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              ease: "easeOut"
            }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Meet our distinguished VIP members who represent the pinnacle of exclusivity and sophistication. 
            These elite individuals enjoy premium access and extraordinary experiences.
          </motion.p>
        </motion.div>

        {/* VIP Members Section */}
        {vipMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* VIP members would render here when they exist */}
          </div>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-center mb-16 py-16"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-600 via-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-2xl"
            >
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </motion.div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-400 mb-4">
              No VIP Members Yet
            </h3>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
              Our VIP program is launching soon! Be among the first to experience exclusive events, 
              premium access, and extraordinary member benefits.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn About VIP Membership
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* VIP Program Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="bg-gradient-to-r from-red-900/20 via-orange-900/15 to-yellow-900/20 backdrop-blur-md rounded-2xl border border-red-500/30 p-8 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
            </svg>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Join Our VIP Program
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Experience the ultimate in luxury and exclusivity. Our VIP program offers unparalleled access 
            to premium events, personalized services, and extraordinary experiences tailored just for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/20">
              <div className="w-8 h-8 mx-auto mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Exclusive Events</h3>
              <p className="text-gray-400 text-sm">Access to private, members-only events and experiences</p>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/20">
              <div className="w-8 h-8 mx-auto mb-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Personal Concierge</h3>
              <p className="text-gray-400 text-sm">Dedicated support for all your premium needs</p>
            </div>

            <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/20">
              <div className="w-8 h-8 mx-auto mb-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Priority Access</h3>
              <p className="text-gray-400 text-sm">First access to new features, events, and content</p>
            </div>
          </div>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 165, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 hover:from-yellow-600 hover:via-orange-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg"
          >
            Apply for VIP Status
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 