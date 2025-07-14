'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const faqData = [
  {
    id: 1,
    category: 'General',
    question: 'How do I register for events?',
    answer: 'You can register for events through our events page. Simply click on the event you\'re interested in and follow the registration process. VIP members get priority access to exclusive events.'
  },
  {
    id: 2,
    category: 'VIP',
    question: 'What are the benefits of VIP membership?',
    answer: 'VIP members enjoy exclusive access to premium events, priority booking, personal concierge service, VIP lounge access, and special discounts on all services.'
  },
  {
    id: 3,
    category: 'Events',
    question: 'Can I cancel my event registration?',
    answer: 'Yes, you can cancel your registration up to 24 hours before the event. Refunds will be processed according to our cancellation policy. VIP members have more flexible cancellation terms.'
  },
  {
    id: 4,
    category: 'Account',
    question: 'How do I update my profile information?',
    answer: 'Go to your account settings in the protected area. You can update your personal information, preferences, and contact details there.'
  },
  {
    id: 5,
    category: 'Technical',
    question: 'I\'m having trouble logging in. What should I do?',
    answer: 'Try clearing your browser cache and cookies. If the issue persists, use the "Forgot Password" link or contact our support team for assistance.'
  },
  {
    id: 6,
    category: 'Events',
    question: 'What should I expect at events?',
    answer: 'Our events feature high-quality entertainment, premium service, and a sophisticated atmosphere. Dress codes and specific guidelines will be provided with your registration confirmation.'
  }
];

const supportCategories = [
  {
    icon: '🎫',
    title: 'Event Support',
    description: 'Questions about events, registration, and attendance',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '👑',
    title: 'VIP Services',
    description: 'VIP membership benefits and exclusive services',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: '⚙️',
    title: 'Technical Help',
    description: 'Website issues, login problems, and technical support',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '💳',
    title: 'Billing & Payments',
    description: 'Payment issues, refunds, and billing inquiries',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '👤',
    title: 'Account Management',
    description: 'Profile updates, security, and account settings',
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: '📞',
    title: 'General Inquiries',
    description: 'Other questions and general information',
    color: 'from-indigo-500 to-blue-500'
  }
];

const helpArticles = [
  {
    title: 'Getting Started Guide',
    description: 'Learn how to navigate our platform and make the most of your experience',
    readTime: '5 min read',
    category: 'General'
  },
  {
    title: 'VIP Membership Benefits',
    description: 'Complete guide to VIP perks, exclusive access, and premium services',
    readTime: '8 min read',
    category: 'VIP'
  },
  {
    title: 'Event Etiquette Guide',
    description: 'What to expect at our events and how to prepare for the best experience',
    readTime: '6 min read',
    category: 'Events'
  },
  {
    title: 'Privacy & Security',
    description: 'How we protect your data and keep your information secure',
    readTime: '4 min read',
    category: 'Account'
  }
];

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(faqData.map(faq => faq.category)))];

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 360]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 10
          }}
          className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"
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
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-red-200 drop-shadow-lg">
              Support Center
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
            Get help when you need it. Find answers to common questions, browse help articles, 
            or contact our support team for personalized assistance.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.6
          }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, FAQs, or topics..."
              className="w-full px-6 py-4 bg-black/50 border border-red-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 pr-12"
            />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Support Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.6
          }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">How can we help you?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.9 + index * 0.1,
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
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-black/60 via-gray-900/80 to-red-900/20 backdrop-blur-md rounded-xl border border-red-500/30 p-6 hover:border-red-400/50 transition-all duration-300 shadow-xl h-full">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 0.6
          }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5
                }}
                className="bg-black/40 backdrop-blur-md rounded-xl border border-red-500/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-orange-600 text-white text-xs rounded-full">
                      {faq.category}
                    </span>
                    <span className="font-medium text-white">{faq.question}</span>
                  </div>
                  <motion.svg
                    animate={{
                      rotate: openFaq === faq.id ? 180 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === faq.id ? 'auto' : 0,
                    opacity: openFaq === faq.id ? 1 : 0
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Help Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.4,
            duration: 0.6
          }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Help Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {helpArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.5 + index * 0.1,
                  duration: 0.6
                }}
                whileHover={{
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
                className="bg-gradient-to-br from-black/60 via-gray-900/80 to-red-900/20 backdrop-blur-md rounded-xl border border-red-500/30 p-6 hover:border-red-400/50 transition-all duration-300 shadow-xl cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-300 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {article.description}
                </p>
                
                <div className="mt-4 flex items-center text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                  Read Article
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.8,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="bg-gradient-to-r from-red-900/20 via-orange-900/15 to-purple-900/20 backdrop-blur-md rounded-2xl border border-red-500/30 p-8 text-center"
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
            className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help. 
            Get personalized assistance and quick responses to your questions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Support
            </motion.button>
            
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Live Chat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 