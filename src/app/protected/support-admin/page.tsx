'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface SupportRequest {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  userRole: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  response?: string;
  user?: {
    name: string;
    email: string;
  };
}

export default function SupportAdminPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null);
  const [response, setResponse] = useState('');
  const [isResponding, setIsResponding] = useState(false);

  const priorityColors = {
    LOW: 'from-gray-500 to-gray-600',
    NORMAL: 'from-blue-500 to-blue-600',
    HIGH: 'from-orange-500 to-orange-600',
    URGENT: 'from-red-500 to-red-600'
  };

  const statusColors = {
    OPEN: 'from-green-500 to-green-600',
    IN_PROGRESS: 'from-yellow-500 to-yellow-600',
    RESOLVED: 'from-blue-500 to-blue-600',
    CLOSED: 'from-gray-500 to-gray-600'
  };

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  const fetchSupportRequests = async () => {
    try {
      const response = await fetch('/api/support-requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data.requests);
      }
    } catch (error) {
      console.error('Error fetching support requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    try {
      const response = await fetch(`/api/support-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchSupportRequests();
        if (selectedRequest?.id === requestId) {
          setSelectedRequest({ ...selectedRequest, status });
        }
      }
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const respondToRequest = async () => {
    if (!selectedRequest || !response.trim()) return;

    setIsResponding(true);
    try {
      const res = await fetch(`/api/support-requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          response: response.trim(),
          status: 'RESOLVED',
          assignedTo: session?.user?.email || 'Admin'
        }),
      });

      if (res.ok) {
        fetchSupportRequests();
        setResponse('');
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Error responding to request:', error);
    } finally {
      setIsResponding(false);
    }
  };

  const filteredRequests = requests
    .filter(request => {
      if (filter === 'all') return true;
      if (filter === 'vip') return request.userRole === 'VIP';
      if (filter === 'open') return request.status === 'OPEN';
      if (filter === 'urgent') return request.priority === 'URGENT' || request.priority === 'HIGH';
      return true;
    })
    .sort((a, b) => {
      // Sort by priority (VIP/HIGH first), then by creation date
      const priorityOrder = { URGENT: 4, HIGH: 3, NORMAL: 2, LOW: 1 };
      const roleOrder = { VIP: 2, ADMIN: 2, USER: 1, WAITING: 1, AUTHENTICATED: 1, REJECTED: 0 };
      
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 2;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 2;
      const aRole = roleOrder[a.userRole as keyof typeof roleOrder] || 1;
      const bRole = roleOrder[b.userRole as keyof typeof roleOrder] || 1;
      
      if (aRole !== bRole) return bRole - aRole;
      if (aPriority !== bPriority) return bPriority - aPriority;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

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
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-orange-200 to-yellow-200">
              Support Administration
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Manage support requests with VIP priority handling
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-wrap gap-4 justify-center"
        >
          {[
            { key: 'all', label: 'All Requests', count: requests.length },
            { key: 'vip', label: 'VIP Priority', count: requests.filter(r => r.userRole === 'VIP').length },
            { key: 'urgent', label: 'Urgent/High', count: requests.filter(r => r.priority === 'URGENT' || r.priority === 'HIGH').length },
            { key: 'open', label: 'Open', count: requests.filter(r => r.status === 'OPEN').length }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg'
                  : 'bg-black/50 text-gray-300 hover:bg-red-900/30 border border-red-500/30'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total Requests', value: requests.length, color: 'from-blue-500 to-blue-600' },
            { label: 'VIP Requests', value: requests.filter(r => r.userRole === 'VIP').length, color: 'from-yellow-500 to-yellow-600' },
            { label: 'Open', value: requests.filter(r => r.status === 'OPEN').length, color: 'from-green-500 to-green-600' },
            { label: 'Resolved', value: requests.filter(r => r.status === 'RESOLVED').length, color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-black/60 via-gray-900/80 to-red-900/20 backdrop-blur-md rounded-xl border border-red-500/30 p-6"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Support Requests List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Support Requests</h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto">
              {filteredRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br from-black/60 via-gray-900/80 to-red-900/20 backdrop-blur-md rounded-xl border ${
                    request.userRole === 'VIP' ? 'border-yellow-500/50' : 'border-red-500/30'
                  } p-6 cursor-pointer hover:border-red-400/50 transition-all duration-300 ${
                    selectedRequest?.id === request.id ? 'ring-2 ring-red-500' : ''
                  }`}
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {request.userRole === 'VIP' && (
                        <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <h3 className="text-lg font-semibold text-white truncate">{request.subject}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${priorityColors[request.priority as keyof typeof priorityColors]}`}>
                        {request.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${statusColors[request.status as keyof typeof statusColors]}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-2">From: {request.name} ({request.email})</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{request.message}</p>
                  
                  <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                    <span>{request.type}</span>
                    <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Request Detail Panel */}
          {selectedRequest && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-black/60 via-gray-900/80 to-red-900/20 backdrop-blur-md rounded-xl border border-red-500/30 p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Request Details</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm text-gray-400">Subject</label>
                  <p className="text-white font-medium">{selectedRequest.subject}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">From</label>
                    <p className="text-white">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedRequest.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Type</label>
                    <p className="text-white">{selectedRequest.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Priority</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${priorityColors[selectedRequest.priority as keyof typeof priorityColors]}`}>
                      {selectedRequest.priority}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">User Role</label>
                    <p className="text-white">{selectedRequest.userRole}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Message</label>
                  <div className="bg-black/30 rounded-lg p-4 mt-2">
                    <p className="text-white whitespace-pre-wrap">{selectedRequest.message}</p>
                  </div>
                </div>

                {selectedRequest.response && (
                  <div>
                    <label className="text-sm text-gray-400">Previous Response</label>
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mt-2">
                      <p className="text-white whitespace-pre-wrap">{selectedRequest.response}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Update Buttons */}
              <div className="flex space-x-2 mb-6">
                {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateRequestStatus(selectedRequest.id, status)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedRequest.status === status
                        ? `bg-gradient-to-r ${statusColors[status as keyof typeof statusColors]} text-white`
                        : 'bg-black/50 text-gray-300 hover:bg-red-900/30 border border-red-500/30'
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Response Form */}
              {selectedRequest.status !== 'RESOLVED' && selectedRequest.status !== 'CLOSED' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Response</label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="w-full h-32 px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition-all duration-300 resize-none"
                    placeholder="Type your response here..."
                  />
                  <button
                    onClick={respondToRequest}
                    disabled={!response.trim() || isResponding}
                    className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResponding ? 'Sending Response...' : 'Send Response & Mark Resolved'}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 