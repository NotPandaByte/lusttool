'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface Staff {
  id: string;
  name: string;
  position: string;
  rank?: string;
  description?: string;
  image?: string;
  vrchatAvatar?: string;
  order: number;
}

export default function StaffAdminPage() {
  const { data: session, status } = useSession();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [uploading, setUploading] = useState(false);

  // Check authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session?.user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-zinc-400">You must be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    rank: '',
    description: '',
    image: '',
    vrchatAvatar: '',
    order: 0
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff');
      if (response.ok) {
        const data = await response.json();
        setStaff(data.staff);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'image' | 'model') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const url = editingStaff ? `/api/staff/${editingStaff.id}` : '/api/staff';
      const method = editingStaff ? 'PUT' : 'POST';

      console.log('Submitting:', { method, url, editingStaff, formData });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        await fetchStaff();
        closeModal();
      } else {
        const error = await response.text();
        console.error('API Error:', response.status, error);
        alert(`Error: ${response.status} - ${error}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Error: ${error}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      try {
        const response = await fetch(`/api/staff/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchStaff();
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const openModal = (staff?: Staff) => {
    console.log('Opening modal with staff:', staff);
    if (staff) {
      setEditingStaff(staff);
      setFormData({
        name: staff.name,
        position: staff.position,
        rank: staff.rank || '',
        description: staff.description || '',
        image: staff.image || '',
        vrchatAvatar: staff.vrchatAvatar || '',
        order: staff.order
      });
      console.log('Setting form data for edit:', {
        name: staff.name,
        position: staff.position,
        rank: staff.rank || '',
        description: staff.description || '',
        image: staff.image || '',
        vrchatAvatar: staff.vrchatAvatar || '',
        order: staff.order
      });
    } else {
      setEditingStaff(null);
      setFormData({
        name: '',
        position: '',
        rank: '',
        description: '',
        image: '',
        vrchatAvatar: '',
        order: 0
      });
      console.log('Setting form data for new staff');
    }
    setIsModalOpen(true);
    console.log('Modal should be open now');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Staff Management</h1>
            <div className="flex space-x-4">
              <div className="text-white text-sm bg-zinc-800 px-3 py-2 rounded">
                User: {session?.user?.email} | Role: {session?.user?.role || 'Unknown'}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Add Staff Member
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900 rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold text-xl">{member.name.charAt(0)}</span>
                    )}
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="text-white font-bold text-lg">{member.name}</h3>
                  <p className="text-indigo-400 text-sm">{member.position}</p>
                  {member.rank && (
                    <p className="text-yellow-400 text-sm">{member.rank}</p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal(member)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Position</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Rank</label>
                    <input
                      type="text"
                      value={formData.rank}
                      onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploading(true);
                          const url = await handleFileUpload(file, 'image');
                          if (url) {
                            setFormData({ ...formData, image: url });
                          }
                          setUploading(false);
                        }
                      }}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer hover:file:bg-indigo-700"
                    />
                    {formData.image && (
                      <div className="mt-2">
                        <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">VRChat Avatar (GLB/GLTF/FBX)</label>
                    <input
                      type="file"
                      accept=".glb,.gltf,.fbx"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploading(true);
                          const url = await handleFileUpload(file, 'model');
                          if (url) {
                            setFormData({ ...formData, vrchatAvatar: url });
                          }
                          setUploading(false);
                        }
                      }}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                    />
                    {formData.vrchatAvatar && (
                      <div className="mt-2">
                        <p className="text-green-400 text-sm">✓ 3D Model uploaded ({formData.vrchatAvatar.split('.').pop()?.toUpperCase()})</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                      {uploading ? 'Uploading...' : (editingStaff ? 'Update' : 'Create')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 