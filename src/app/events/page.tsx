'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  capacity: number;
  registrationCount: number;
  price?: number;
  features: string[];
  status: string;
  published: boolean;
  image?: {
    id: string;
    data: Buffer;
    mimetype: string;
    filename?: string;
  };
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events?published=true');
      if (response.ok) {
        const data = await response.json();
        const events = data.events || [];
        
        const now = new Date();
        const upcoming = events.filter((event: Event) => new Date(event.date) >= now);
        const past = events.filter((event: Event) => new Date(event.date) < now);
        
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'PREMIUM':
        return 'from-yellow-400 to-orange-500';
      case 'ELITE':
        return 'from-red-500 to-pink-500';
      case 'EXCLUSIVE':
        return 'from-purple-500 to-red-500';
      default:
        return 'from-red-400 to-orange-400';
    }
  };

  const getEventTypeBorder = (type: string) => {
    switch (type) {
      case 'PREMIUM':
        return 'border-yellow-400/50';
      case 'ELITE':
        return 'border-red-500/50';
      case 'EXCLUSIVE':
        return 'border-purple-500/50';
      default:
        return 'border-red-400/50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAvailabilityStatus = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 90) return { status: 'Almost Full', color: 'text-red-400' };
    if (percentage >= 70) return { status: 'Filling Fast', color: 'text-orange-400' };
    return { status: 'Available', color: 'text-green-400' };
  };

  const getImageSrc = (event: Event) => {
    if (event.image && event.image.data) {
      const base64 = Buffer.from(event.image.data).toString('base64');
      return `data:${event.image.mimetype};base64,${base64}`;
    }
    return '/favicon.ico'; // Fallback image
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 360]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
            rotate: [360, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 10
          }}
          className="absolute bottom-10 left-20 w-48 h-48 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full blur-3xl"
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
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
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
              Exclusive Events
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
            Experience unforgettable nights filled with passion, elegance, and premium entertainment. 
            Join our exclusive events designed for discerning individuals who appreciate the extraordinary.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.5
          }}
          className="flex justify-center mb-12"
        >
          <div className="bg-black/50 backdrop-blur-md rounded-full p-2 border border-red-500/30">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Upcoming Events ({upcomingEvents.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Past Events ({pastEvents.length})
              </button>
            </div>
          </div>
        </motion.div>

        {/* Events Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'upcoming' ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          {activeTab === 'upcoming' ? (
            // Upcoming Events
            <>
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {upcomingEvents.map((event, index) => {
                    const availability = getAvailabilityStatus(event.registrationCount, event.capacity);
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: index * 0.2,
                          duration: 0.7,
                          ease: [0.175, 0.885, 0.32, 1.275]
                        }}
                        whileHover={{
                          y: -10,
                          scale: 1.02,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }
                        }}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                      >
                        {/* Glow effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${getEventTypeColor(event.type)} opacity-20 rounded-2xl blur-xl`}
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        />

                        {/* Main card */}
                        <div className={`relative bg-gradient-to-br from-black/80 via-gray-900/90 to-red-900/30 backdrop-blur-md rounded-2xl border-2 ${getEventTypeBorder(event.type)} hover:border-opacity-70 transition-all duration-300 shadow-2xl overflow-hidden`}>
                          
                          {/* Event type badge */}
                          <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${getEventTypeColor(event.type)} text-white text-xs font-bold rounded-full shadow-lg z-10`}>
                            {event.type}
                          </div>

                          {/* Event image */}
                          <div className="relative h-48 overflow-hidden rounded-t-2xl">
                            <Image
                              src={getImageSrc(event)}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            {/* Date overlay */}
                            <div className="absolute bottom-4 left-4 text-white">
                              <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                              <div className="text-sm opacity-90">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
                            
                            {/* Event details */}
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-sm text-gray-400">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(event.date)} at {event.time}
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                              </div>
                              {event.price && event.price > 0 && (
                                <div className="flex items-center text-sm text-gray-400">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                  </svg>
                                  ${event.price}
                                </div>
                              )}
                            </div>

                            {/* Availability */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-sm">
                                <span className="text-gray-400">Availability: </span>
                                <span className={`font-semibold ${availability.color}`}>
                                  {availability.status}
                                </span>
                              </div>
                              <div className="text-sm text-gray-400">
                                {event.registrationCount}/{event.capacity} registered
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(event.registrationCount / event.capacity) * 100}%` }}
                                transition={{ delay: index * 0.2 + 0.5, duration: 1, ease: "easeOut" }}
                                className={`h-2 rounded-full bg-gradient-to-r ${getEventTypeColor(event.type)}`}
                              />
                            </div>

                            {/* Expandable features */}
                            <motion.div
                              initial={false}
                              animate={{
                                height: selectedEvent === event.id ? 'auto' : 0,
                                opacity: selectedEvent === event.id ? 1 : 0
                              }}
                              transition={{
                                duration: 0.3,
                                ease: "easeOut"
                              }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-gray-700 pt-4 mt-4">
                                <h4 className="text-sm font-semibold text-white mb-2">Event Features</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {event.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-center text-xs text-gray-300">
                                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${getEventTypeColor(event.type)} rounded-full mr-2`} />
                                      {feature}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>

                            {/* Register button */}
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full mt-4 py-3 bg-gradient-to-r ${getEventTypeColor(event.type)} text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                            >
                              Register Now
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                // Empty state for upcoming events
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center py-16"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-400 mb-4">
                    No Upcoming Events
                  </h3>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
                    We&apos;re planning some amazing experiences for you! Check back soon for upcoming exclusive events, 
                    or join our newsletter to be the first to know when new events are announced.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                      Subscribe for Updates
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </>
          ) : (
            // Past Events
            <>
              {pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.2,
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
                      className="bg-gradient-to-br from-black/60 via-gray-900/80 to-red-900/20 backdrop-blur-md rounded-2xl border border-red-500/30 p-6 shadow-xl"
                    >
                      <div className="flex items-start space-x-4">
                        <Image
                          src={getImageSrc(event)}
                          alt={event.title}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                          <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-gray-400">
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-gray-400">
                                {event.registrationCount} attendees
                              </div>
                              <div className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${getEventTypeColor(event.type)} text-white`}>
                                {event.type}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Empty state for past events
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center py-16"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-400 mb-4">
                    No Past Events Yet
                  </h3>
                  <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
                    Our event history will appear here once we&apos;ve hosted some amazing experiences. 
                    Stay tuned for our upcoming events that will create lasting memories!
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <button 
                      onClick={() => setActiveTab('upcoming')}
                      className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      View Upcoming Events
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mt-16 bg-gradient-to-r from-red-900/20 via-orange-900/15 to-yellow-900/20 backdrop-blur-md rounded-2xl border border-red-500/30 p-8 text-center"
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
            className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-red-400 to-orange-600 rounded-full flex items-center justify-center"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Never Miss an Event
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Be the first to know about our exclusive events. Subscribe to our newsletter and get early access 
            to tickets, special discounts, and behind-the-scenes content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 