'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ContactPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
        </svg>
      ),
      title: 'Discord',
      description: 'Join our community',
      contact: 'Laced in Lust Server',
      href: 'https://discord.com/invite/egBjhyTFrp'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.46 5.92c-.8.36-1.67.6-2.58.71a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08 4.48 4.48 0 0 0-7.63 4.08A12.7 12.7 0 0 1 3.1 4.86a4.48 4.48 0 0 0 1.39 5.98c-.73-.02-1.42-.22-2.02-.56v.06a4.48 4.48 0 0 0 3.6 4.4c-.34.09-.7.14-1.07.14-.26 0-.51-.02-.76-.07a4.48 4.48 0 0 0 4.18 3.11A9 9 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.41-.01-.61a9.1 9.1 0 0 0 2.23-2.32z"/>
        </svg>
      ),
      title: 'Twitter/X',
      description: 'Follow us for updates',
      contact: '@MikaMasaki_',
      href: 'https://x.com/MikaMasaki_'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      title: 'Instagram',
      description: 'Visual updates and content',
      contact: '@mikamasaki.vrc',
      href: 'https://www.instagram.com/mikamasaki.vrc/'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'events', label: 'Event Information' },
    { value: 'vip', label: 'VIP Membership' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'feedback', label: 'Feedback' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/support-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: session?.user?.id || null,
          userRole: session?.user?.role || 'USER'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            type: 'general'
          });
        }, 3000);
      } else {
        console.error('Failed to submit support request');
      }
    } catch (error) {
      console.error('Error submitting support request:', error);
    } finally {
      setIsSubmitting(false);
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
            x: [0, 100, 0],
            y: [0, -50, 0]
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
            x: [0, -80, 0],
            y: [0, 60, 0]
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
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200 drop-shadow-lg">
              Get in Touch
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
            We're here to help and answer any questions you might have. 
            Reach out to us through any of our channels or send us a message directly.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-8">Contact Methods</h2>
            
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }
                  }}
                  className="group"
                >
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block bg-gradient-to-br from-black/60 via-gray-900/80 to-red-900/20 backdrop-blur-md rounded-xl border border-red-500/30 p-6 hover:border-red-400/50 transition-all duration-300 shadow-xl"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-red-300 transition-colors">
                          {method.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">{method.description}</p>
                        <p className="text-red-400 font-medium">{method.contact}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.2,
                duration: 0.6,
                ease: "easeOut"
              }}
              className="mt-8 bg-gradient-to-r from-red-900/20 via-orange-900/15 to-yellow-900/20 backdrop-blur-md rounded-xl border border-red-500/30 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Response Times</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Support requests:</span>
                  <span className="text-white">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Discord messages:</span>
                  <span className="text-white">Usually within 2-4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">VIP requests:</span>
                  <span className="text-red-400">Priority response</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-8">Send us a Message</h2>
            
            <div className="bg-gradient-to-br from-black/60 via-gray-900/80 to-red-900/20 backdrop-blur-md rounded-xl border border-red-500/30 p-6 shadow-xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-white mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value} className="bg-gray-900">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 