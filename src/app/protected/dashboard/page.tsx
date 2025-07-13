'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Transition } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Staff {
  id: string;
  name: string;
  position: string;
  description?: string;
  image?: string;
  order: number;
  createdAt: string;
}

const smoothTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30
};

const gentleTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [waitingUsers, setWaitingUsers] = useState<User[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState<string | null>(null);
  const [deletingStaff, setDeletingStaff] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'staff'>('users');
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: '',
    position: '',
    description: '',
    order: 0
  });

  // Redirect if not authenticated or not authorized
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup');
    } else if (status === 'authenticated' && session?.user?.role !== 'AUTHENTICATED') {
      router.push('/');
    }
  }, [status, session, router]);

  // Fetch data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'AUTHENTICATED') {
      fetchData();
    }
  }, [status, session]);

  const fetchData = async () => {
    try {
      const [usersResponse, staffResponse] = await Promise.all([
        fetch('/api/waiting-users'),
        fetch('/api/staff')
      ]);

      if (usersResponse.ok) {
        const userData = await usersResponse.json();
        setWaitingUsers(userData.users);
      }

      if (staffResponse.ok) {
        const staffData = await staffResponse.json();
        setStaff(staffData.staff);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const promoteUser = async (userId: string) => {
    setPromoting(userId);
    try {
      const response = await fetch('/api/promote-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setWaitingUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      alert('Error promoting user');
    } finally {
      setPromoting(null);
    }
  };

  const addStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffForm),
      });

      if (response.ok) {
        const data = await response.json();
        setStaff(prev => [...prev, data.staff]);
        setStaffForm({ name: '', position: '', description: '', order: 0 });
        setShowStaffForm(false);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Error adding staff member');
    }
  };

  const deleteStaff = async (staffId: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return;
    
    setDeletingStaff(staffId);
    try {
      const response = await fetch(`/api/staff/${staffId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setStaff(prev => prev.filter(member => member.id !== staffId));
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      alert('Error deleting staff member');
    } finally {
      setDeletingStaff(null);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={gentleTransition}
          className="text-center"
        >
          <div className="w-12 h-12 spinner mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Only show dashboard to authenticated users
  if (status !== 'authenticated' || session?.user?.role !== 'AUTHENTICATED') {
    return null;
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={gentleTransition}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Staff Dashboard
            </h1>
            <p className="text-zinc-400">
              Manage user access and staff members
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ...gentleTransition }}
            className="flex space-x-2 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-lg font-medium animate-smooth ${
                activeTab === 'users'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              User Approvals
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('staff')}
              className={`px-6 py-3 rounded-lg font-medium animate-smooth ${
                activeTab === 'staff'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              Staff Management
            </motion.button>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={gentleTransition}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">
                        Pending Approvals
                      </h2>
                      <p className="text-zinc-400 mt-1">
                        Users awaiting account approval
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-yellow-300 font-medium text-sm">
                        {waitingUsers.length} pending
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <AnimatePresence mode="popLayout">
                    {waitingUsers.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={gentleTransition}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">All Clear!</h3>
                        <p className="text-zinc-400">No users waiting for approval</p>
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        {waitingUsers.map((user, index) => (
                          <motion.div
                            key={user.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05, ...gentleTransition }}
                            className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 animate-smooth"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <motion.div 
                                  className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
                                  whileHover={{ scale: 1.05 }}
                                  transition={smoothTransition}
                                >
                                  <span className="text-white font-bold text-lg">
                                    {user.name?.charAt(0) || 'U'}
                                  </span>
                                </motion.div>
                                <div>
                                  <h3 className="font-semibold text-white text-lg">
                                    {user.name || 'Unknown User'}
                                  </h3>
                                  <p className="text-zinc-400">{user.email}</p>
                                  <p className="text-sm text-zinc-500">
                                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <span className="px-3 py-1 text-sm bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
                                  {user.role}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => promoteUser(user.id)}
                                  disabled={promoting === user.id}
                                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg animate-smooth font-medium glow-subtle btn-hover"
                                >
                                  {promoting === user.id ? (
                                    <div className="flex items-center space-x-2">
                                      <div className="w-4 h-4 spinner"></div>
                                      <span>Approving...</span>
                                    </div>
                                  ) : (
                                    'Approve'
                                  )}
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Staff Tab */}
            {activeTab === 'staff' && (
              <motion.div
                key="staff"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={gentleTransition}
                className="space-y-6"
              >
                {/* Add Staff Button */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowStaffForm(!showStaffForm)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium animate-smooth btn-hover"
                  >
                    {showStaffForm ? 'Cancel' : 'Add Staff Member'}
                  </motion.button>
                </div>

                {/* Staff Form */}
                <AnimatePresence>
                  {showStaffForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={gentleTransition}
                      className="glass rounded-2xl p-8 overflow-hidden"
                    >
                      <h3 className="text-xl font-semibold text-white mb-6">Add New Staff Member</h3>
                      <form onSubmit={addStaff} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                            <input
                              type="text"
                              required
                              value={staffForm.name}
                              onChange={(e) => setStaffForm(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus-ring animate-smooth"
                              placeholder="Staff member name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Position</label>
                            <input
                              type="text"
                              required
                              value={staffForm.position}
                              onChange={(e) => setStaffForm(prev => ({ ...prev, position: e.target.value }))}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus-ring animate-smooth"
                              placeholder="Job title/position"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
                          <textarea
                            value={staffForm.description}
                            onChange={(e) => setStaffForm(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus-ring animate-smooth resize-none"
                            placeholder="Brief description (optional)"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">Display Order</label>
                          <input
                            type="number"
                            value={staffForm.order}
                            onChange={(e) => setStaffForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus-ring animate-smooth"
                            placeholder="Order for display (0 = first)"
                          />
                        </div>
                        <div className="flex space-x-4 pt-4">
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium animate-smooth btn-hover"
                          >
                            Add Staff Member
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowStaffForm(false)}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium animate-smooth"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Staff List */}
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="px-8 py-6 border-b border-white/10">
                    <h2 className="text-2xl font-semibold text-white">
                      Staff Members
                    </h2>
                    <p className="text-zinc-400 mt-1">
                      Manage your team members
                    </p>
                  </div>
                  
                  <div className="p-8">
                    <AnimatePresence mode="popLayout">
                      {staff.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={gentleTransition}
                          className="text-center py-12"
                        >
                          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-2">No Staff Members</h3>
                          <p className="text-zinc-400">Add your first staff member to get started</p>
                        </motion.div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {staff.map((member, index) => (
                            <motion.div
                              key={member.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ delay: index * 0.05, ...gentleTransition }}
                              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 animate-smooth"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-4">
                                  <motion.div 
                                    className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
                                    whileHover={{ scale: 1.05 }}
                                    transition={smoothTransition}
                                  >
                                    <span className="text-white font-bold text-lg">
                                      {member.name.charAt(0)}
                                    </span>
                                  </motion.div>
                                  <div>
                                    <h3 className="font-semibold text-white text-lg">
                                      {member.name}
                                    </h3>
                                    <p className="text-indigo-400 text-sm">{member.position}</p>
                                    {member.description && (
                                      <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{member.description}</p>
                                    )}
                                    <p className="text-zinc-500 text-xs mt-2">
                                      Order: {member.order}
                                    </p>
                                  </div>
                                </div>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => deleteStaff(member.id)}
                                  disabled={deletingStaff === member.id}
                                  className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg animate-smooth disabled:opacity-50"
                                >
                                  {deletingStaff === member.id ? (
                                    <div className="w-4 h-4 spinner"></div>
                                  ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  )}
                                </motion.button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 