'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [waitingUsers, setWaitingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState<string | null>(null);

  // Redirect if not authenticated or not authorized
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signup');
    } else if (status === 'authenticated' && session?.user?.role !== 'AUTHENTICATED') {
      router.push('/');
    }
  }, [status, session, router]);

  // Fetch waiting users
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'AUTHENTICATED') {
      fetchWaitingUsers();
    }
  }, [status, session]);

  const fetchWaitingUsers = async () => {
    try {
      const response = await fetch('/api/waiting-users');
      if (response.ok) {
        const data = await response.json();
        setWaitingUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching waiting users:', error);
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
        // Remove user from waiting list
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

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Only show dashboard to authenticated users
  if (status !== 'authenticated' || session?.user?.role !== 'AUTHENTICATED') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          User Management Dashboard
        </h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Waiting Users ({waitingUsers.length})
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Users waiting for account approval
            </p>
          </div>
          
          <div className="p-6">
            {waitingUsers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No users waiting for approval</p>
              </div>
            ) : (
              <div className="space-y-4">
                {waitingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {user.name || 'Unknown User'}
                          </h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        {user.role}
                      </span>
                      <button
                        onClick={() => promoteUser(user.id)}
                        disabled={promoting === user.id}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        {promoting === user.id ? 'Promoting...' : 'Approve'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 