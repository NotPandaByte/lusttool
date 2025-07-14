'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserStatus {
  user: {
    id: string;
    name?: string;
    email?: string;
    role: string;
    image?: string;
  };
  isAdmin: boolean;
  isStaff: boolean;
  staffProfile?: {
    id: string;
    name: string;
    rank?: string;
    description?: string;
    order: number;
  } | null;
}

interface QuickStats {
  totalUsers: number;
  waitingUsers: number;
  authenticatedUsers: number;
  rejectedUsers: number;
  totalStaff: number;
}

export default function OverviewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [stats, setStats] = useState<QuickStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup');
    } else if (status === 'authenticated') {
      fetchUserStatus();
      fetchStats();
    }
  }, [status, router]);

  const fetchUserStatus = async () => {
    try {
      const response = await fetch('/api/user-status');
      if (response.ok) {
        const data = await response.json();
        setUserStatus(data);
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [usersResponse, staffResponse] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/staff')
      ]);

      if (usersResponse.ok && staffResponse.ok) {
        const usersData = await usersResponse.json();
        const staffData = await staffResponse.json();

        const users = usersData.users;
        const stats: QuickStats = {
          totalUsers: users.length,
          waitingUsers: users.filter((u: any) => u.role === 'WAITING').length,
          authenticatedUsers: users.filter((u: any) => u.role === 'AUTHENTICATED').length,
          rejectedUsers: users.filter((u: any) => u.role === 'REJECTED').length,
          totalStaff: staffData.staff.length
        };

        setStats(stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session?.user) {
    return null;
  }

  if (!userStatus) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-zinc-400">Unable to verify your staff status.</p>
        </div>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                {userStatus.user.image ? (
                  <img src={userStatus.user.image} alt={userStatus.user.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white font-bold text-xl">
                    {userStatus.user.name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {getGreeting()}, {userStatus.user.name || 'Staff Member'}!
                </h1>
                <p className="text-zinc-400">
                  {userStatus.staffProfile?.rank && `${userStatus.staffProfile.rank} • `}
                  Welcome to your staff overview
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          {stats && userStatus.isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
            >
              <div className="bg-zinc-900 rounded-xl p-4 border border-white/10">
                <h3 className="text-zinc-400 text-sm font-medium">Total Users</h3>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4 border border-yellow-500/20">
                <h3 className="text-yellow-400 text-sm font-medium">Waiting</h3>
                <p className="text-2xl font-bold text-yellow-300">{stats.waitingUsers}</p>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4 border border-green-500/20">
                <h3 className="text-green-400 text-sm font-medium">Authenticated</h3>
                <p className="text-2xl font-bold text-green-300">{stats.authenticatedUsers}</p>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4 border border-red-500/20">
                <h3 className="text-red-400 text-sm font-medium">Rejected</h3>
                <p className="text-2xl font-bold text-red-300">{stats.rejectedUsers}</p>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4 border border-purple-500/20">
                <h3 className="text-purple-400 text-sm font-medium">Staff Members</h3>
                <p className="text-2xl font-bold text-purple-300">{stats.totalStaff}</p>
              </div>
            </motion.div>
          )}

          {/* Navigation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Staff Administration - Only for admins */}
            {userStatus.isAdmin && (
              <Link href="/protected/staff-admin">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-indigo-500/30 hover:border-indigo-400/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Staff Administration</h3>
                      <p className="text-sm text-zinc-400">Manage users and staff profiles</p>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm">
                    View all registered users, approve/reject accounts, and manage staff member profiles.
                  </p>
                </motion.div>
              </Link>
            )}

            {/* Dashboard - Only for admins */}
            {userStatus.isAdmin && (
              <Link href="/protected/dashboard">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-xl p-6 border border-emerald-500/30 hover:border-emerald-400/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Legacy Dashboard</h3>
                      <p className="text-sm text-zinc-400">Original admin interface</p>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm">
                    Access the original dashboard with user management and staff creation tools.
                  </p>
                </motion.div>
              </Link>
            )}

            {/* Public Staff Page */}
            <Link href="/staff">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">View Staff Page</h3>
                    <p className="text-sm text-zinc-400">Public staff directory</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm">
                  View the public-facing staff page to see how your profile appears to visitors.
                </p>
              </motion.div>
            </Link>

            {/* Event Pictures */}
            <Link href="/event-pictures">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 rounded-xl p-6 border border-pink-500/30 hover:border-pink-400/50 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Event Pictures</h3>
                    <p className="text-sm text-zinc-400">Photo gallery</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm">
                  Browse and manage photos from events and gatherings.
                </p>
              </motion.div>
            </Link>

            {/* Home Page */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Home Page</h3>
                    <p className="text-sm text-zinc-400">Main website</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm">
                  Return to the main website and public pages.
                </p>
              </motion.div>
            </Link>

            {/* Settings/Profile (placeholder) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl p-6 border border-violet-500/30 hover:border-violet-400/50 transition-all cursor-pointer opacity-60"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-violet-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Settings</h3>
                  <p className="text-sm text-zinc-400">Coming soon</p>
                </div>
              </div>
              <p className="text-zinc-300 text-sm">
                Profile settings and preferences (coming soon).
              </p>
            </motion.div>
          </motion.div>

          {/* Staff Profile Info */}
          {userStatus.staffProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-900 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-4">Your Staff Profile</h2>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {userStatus.staffProfile.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{userStatus.staffProfile.name}</h3>
                  {userStatus.staffProfile.rank && (
                    <p className="text-purple-400 text-sm">{userStatus.staffProfile.rank}</p>
                  )}
                  {userStatus.staffProfile.description && (
                    <p className="text-zinc-400 text-sm mt-1">{userStatus.staffProfile.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 