'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'Premium' | 'Elite' | 'Exclusive' | 'Regular';
  capacity: number;
  registered: number;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
  features: string[];
  price?: number;
  staffAssigned: string[];
}

export default function PlanningPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'manage' | 'analytics'>('overview');
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state for creating new events
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'Regular' as Event['type'],
    capacity: 50,
    features: [] as string[],
    price: 0,
    staffAssigned: [] as string[]
  });

  // Sample events data
  const sampleEvents: Event[] = [
    {
      id: '1',
      title: 'Crimson Nights',
      description: 'An intimate evening of passion and elegance featuring exclusive performances and premium entertainment.',
      date: '2024-02-15',
      time: '21:00',
      location: 'VIP Lounge',
      type: 'Premium',
      capacity: 50,
      registered: 32,
      status: 'active',
      createdBy: 'Admin',
      createdAt: '2024-01-15',
      features: ['Live Performances', 'Premium Bar', 'VIP Access', 'Exclusive Menu'],
      price: 75,
      staffAssigned: ['Staff A', 'Staff B']
    },
    {
      id: '2',
      title: 'Midnight Desires',
      description: 'A luxurious late-night experience with sophisticated entertainment and ambient atmosphere.',
      date: '2024-02-22',
      time: '23:00',
      location: 'Main Floor',
      type: 'Elite',
      capacity: 80,
      registered: 15,
      status: 'planning',
      createdBy: 'Admin',
      createdAt: '2024-01-20',
      features: ['DJ Sets', 'Themed Decor', 'Signature Cocktails', 'Photo Booth'],
      price: 50,
      staffAssigned: ['Staff C']
    }
  ];

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup');
    } else if (status === 'authenticated' && session?.user?.role !== 'AUTHENTICATED') {
      router.push('/');
    } else if (status === 'authenticated') {
      // Load events (simulate API call)
      setTimeout(() => {
        setEvents(sampleEvents);
        setLoading(false);
      }, 1000);
    }
  }, [status, session, router]);

  const handleCreateEvent = () => {
    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
      registered: 0,
      status: 'planning',
      createdBy: session?.user?.name || 'Unknown',
      createdAt: new Date().toISOString()
    };

    setEvents(prev => [event, ...prev]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'Regular',
      capacity: 50,
      features: [],
      price: 0,
      staffAssigned: []
    });
    setActiveTab('overview');
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Premium': return 'from-yellow-500 to-orange-600';
      case 'Elite': return 'from-red-500 to-pink-600';
      case 'Exclusive': return 'from-purple-500 to-red-600';
      default: return 'from-blue-500 to-cyan-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'text-yellow-400 bg-yellow-400/20';
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'completed': return 'text-blue-400 bg-blue-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const analytics = {
    totalEvents: events.length,
    activeEvents: events.filter(e => e.status === 'active').length,
    totalRegistrations: events.reduce((sum, e) => sum + e.registered, 0),
    avgCapacityUsed: events.length > 0 ? Math.round((events.reduce((sum, e) => sum + (e.registered / e.capacity), 0) / events.length) * 100) : 0,
    revenue: events.reduce((sum, e) => sum + (e.registered * (e.price || 0)), 0)
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
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
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 mb-2">
            Event Management
          </h1>
          <p className="text-gray-300">Plan, manage, and analyze your events</p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'create', label: 'Create Event', icon: '➕' },
            { id: 'manage', label: 'Manage Events', icon: '⚙️' },
            { id: 'analytics', label: 'Analytics', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content based on active tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Events', value: analytics.totalEvents, icon: '🎪', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Active Events', value: analytics.activeEvents, icon: '🎯', color: 'from-green-500 to-emerald-500' },
                  { label: 'Total Registrations', value: analytics.totalRegistrations, icon: '👥', color: 'from-purple-500 to-pink-500' },
                  { label: 'Avg Capacity Used', value: `${analytics.avgCapacityUsed}%`, icon: '📊', color: 'from-orange-500 to-red-500' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl text-white`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{stat.icon}</span>
                      <span className="text-2xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-sm opacity-90">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Events */}
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-red-500/30 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Events</h2>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getEventTypeColor(event.type)}`} />
                        <div>
                          <h3 className="font-semibold text-white">{event.title}</h3>
                          <p className="text-sm text-gray-400">{event.date} at {event.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                        <p className="text-sm text-gray-400 mt-1">{event.registered}/{event.capacity}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-red-500/30 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Create New Event</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Event Title</label>
                      <input
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                        placeholder="Enter event title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Event Type</label>
                      <select
                        value={newEvent.type}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as Event['type'] }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                      >
                        <option value="Regular">Regular</option>
                        <option value="Premium">Premium</option>
                        <option value="Elite">Elite</option>
                        <option value="Exclusive">Exclusive</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Description</label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors resize-none"
                      placeholder="Describe your event..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Date</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Time</label>
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Capacity</label>
                      <input
                        type="number"
                        value={newEvent.capacity}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Location</label>
                      <input
                        type="text"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                        placeholder="Event location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Price ($)</label>
                      <input
                        type="number"
                        value={newEvent.price}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={handleCreateEvent}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Create Event
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/40 backdrop-blur-md rounded-xl border border-red-500/30 p-6 hover:border-red-400/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-white text-lg">{event.title}</h3>
                        <p className="text-sm text-gray-400">{event.date} at {event.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">{event.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Capacity:</span>
                        <span className="text-white">{event.registered}/{event.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                        View
                      </button>
                      <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors">
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Revenue Chart Placeholder */}
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-red-500/30 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Revenue Analytics</h2>
                <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Revenue chart would go here</p>
                </div>
              </div>

              {/* Detailed Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 backdrop-blur-md rounded-xl border border-red-500/30 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Event Performance</h3>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-center justify-between">
                        <span className="text-gray-300">{event.title}</span>
                        <div className="text-right">
                          <span className="text-white font-semibold">
                            {Math.round((event.registered / event.capacity) * 100)}%
                          </span>
                          <div className="w-16 h-2 bg-gray-700 rounded-full mt-1">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${getEventTypeColor(event.type)}`}
                              style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-md rounded-xl border border-red-500/30 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Financial Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Revenue:</span>
                      <span className="text-green-400 font-semibold">${analytics.revenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Ticket Price:</span>
                      <span className="text-white">${Math.round(analytics.revenue / Math.max(analytics.totalRegistrations, 1))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Events This Month:</span>
                      <span className="text-white">{events.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 