'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Calendar, Star, Shield, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Community Members', value: '450+', color: 'text-red-400' },
    { icon: Calendar, label: 'Events Hosted', value: '50+', color: 'text-orange-400' },
    { icon: Star, label: 'Years of Experience', value: '2+', color: 'text-yellow-400' },
    { icon: Users, label: 'Partners & Sponsors', value: '5+', color: 'text-green-400' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'We prioritize the safety and well-being of all our community members with strict verification and moderation.',
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      icon: Heart,
      title: 'Inclusive Community',
      description: 'Building an accepting and diverse environment where everyone can express themselves authentically.',
      gradient: 'from-orange-500/20 to-yellow-500/20'
    },
    {
      icon: Sparkles,
      title: 'Premium Experience',
      description: 'Delivering high-quality events and services that exceed expectations and create lasting memories.',
      gradient: 'from-yellow-500/20 to-red-500/20'
    }
  ];



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
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"
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
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              We are <span className="text-red-400 font-semibold">Laced in Lust</span>, 
              a group of dedicated individuals passionate about creating exceptional adult experiences 
              and fostering an inclusive, safe community.
            </motion.p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Founded with a passion for excellence and a commitment to creating unforgettable experiences, 
                Laced in Lust has grown from a small vision into a thriving community of like-minded individuals 
                who value quality, safety, and authentic connections.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                What started as a dream to revolutionize adult entertainment has evolved into something much greater. 
                We believe that every experience should be crafted with care, every interaction should be meaningful, 
                and every member of our community should feel valued and respected.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Today, we continue to push boundaries, innovate experiences, and build lasting relationships with our 
                community members. Our commitment to excellence, safety, and inclusivity remains at the heart of 
                everything we do.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Our Values
              </h2>
              <p className="text-lg text-gray-300">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`bg-gradient-to-br ${value.gradient} backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300`}
                >
                  <value.icon className="w-12 h-12 text-red-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Statement Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-gradient-to-br from-red-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-md border border-white/10 rounded-3xl p-12 mb-8"
              >
                <blockquote className="text-2xl md:text-3xl font-light text-gray-200 leading-relaxed mb-6 italic">
                  &ldquo;We believe that authentic connections and memorable experiences are the foundation of any great community.&rdquo;
                </blockquote>
                <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-400 mx-auto mb-6 rounded-full"></div>
                <p className="text-lg text-gray-300">
                  Thank you for taking the time to learn about who we are and what we stand for. 
                  We look forward to being part of your journey.
                </p>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex justify-center space-x-4"
              >
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
      </div>
    </div>
  );
} 