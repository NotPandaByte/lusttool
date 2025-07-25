'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface Staff {
  id: string;
  name: string;
  rank?: string;
  description?: string;
  image?: string;
  banner?: string;
  vrchatAvatar?: string;
  links?: string;
  order: number;
}

interface LinkItem {
  label: string;
  url: string;
  id: string;
}

// Link Management Modal Component
function LinkManagementModal({ 
  isOpen, 
  onClose, 
  links,
  onSave,
  onEdit,
  onDelete
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  links: LinkItem[];
  onSave: (link: LinkItem) => void;
  onEdit: (link: LinkItem) => void;
  onDelete: (linkId: string) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');
  
  const predefinedLabels = [
    'Server', 'Instagram', 'Twitter', 'Discord', 'GitHub', 
    'YouTube', 'Twitch', 'LinkedIn', 'Website', 'Portfolio'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    const finalLabel = label.trim() || url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    
    onSave({
      id: Date.now().toString(),
      url: url.trim(),
      label: finalLabel
    });
    
    // Reset form
    setUrl('');
    setLabel('');
    setShowAddForm(false);
  };

  const handlePredefinedLabel = (predefinedLabel: string) => {
    setLabel(predefinedLabel);
  };

  const handleClose = () => {
    setUrl('');
    setLabel('');
    setShowAddForm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-zinc-900 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                Manage Links
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Current Links */}
              <div>
                <h4 className="text-white font-medium mb-3">Current Links</h4>
                <div className="space-y-2">
                  {links.length === 0 ? (
                    <div className="text-zinc-500 text-sm text-center py-4 bg-white/5 rounded-lg">
                      No links added yet
                    </div>
                  ) : (
                    links.map((link) => (
                      <div key={link.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm">{link.label}</div>
                          <div className="text-zinc-400 text-xs truncate">{link.url}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onEdit(link)}
                            className="w-6 h-6 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded-md flex items-center justify-center transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onDelete(link.id)}
                            className="w-6 h-6 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-md flex items-center justify-center transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add Link Form */}
              <div>
                {!showAddForm ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddForm(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Add New Link
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm">URL *</label>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                          placeholder="https://example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2 text-sm">Display Label</label>
                        <input
                          type="text"
                          value={label}
                          onChange={(e) => setLabel(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                          placeholder="Custom label (optional)"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2 text-sm">Quick Labels</label>
                        <div className="grid grid-cols-3 gap-2">
                          {predefinedLabels.map((predefinedLabel) => (
                            <motion.button
                              key={predefinedLabel}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePredefinedLabel(predefinedLabel)}
                              className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${
                                label === predefinedLabel
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              {predefinedLabel}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-medium transition-colors text-sm"
                        >
                          Add Link
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-3 rounded-lg font-medium transition-colors text-sm"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Save All Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Save All Links
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Edit Link Modal Component
function EditLinkModal({ 
  isOpen, 
  onClose, 
  link,
  onSave
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  link: LinkItem | null;
  onSave: (link: LinkItem) => void;
}) {
  const [url, setUrl] = useState(link?.url || '');
  const [label, setLabel] = useState(link?.label || '');
  
  const predefinedLabels = [
    'Server', 'Instagram', 'Twitter', 'Discord', 'GitHub', 
    'YouTube', 'Twitch', 'LinkedIn', 'Website', 'Portfolio'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !link) return;
    
    const finalLabel = label.trim() || url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    
    onSave({
      id: link.id,
      url: url.trim(),
      label: finalLabel
    });
    
    onClose();
  };

  const handlePredefinedLabel = (predefinedLabel: string) => {
    setLabel(predefinedLabel);
  };

  const handleClose = () => {
    setUrl(link?.url || '');
    setLabel(link?.label || '');
    onClose();
  };

  useEffect(() => {
    if (link) {
      setUrl(link.url);
      setLabel(link.label);
    }
  }, [link]);

  if (!isOpen || !link) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-zinc-900 rounded-2xl max-w-md w-full border border-white/20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                Edit Link
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">URL *</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Display Label</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Custom label (optional)"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-3">Quick Labels</label>
                <div className="grid grid-cols-2 gap-2">
                  {predefinedLabels.map((predefinedLabel) => (
                    <motion.button
                      key={predefinedLabel}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePredefinedLabel(predefinedLabel)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        label === predefinedLabel
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {predefinedLabel}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Update Link
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function StaffAdminPage() {
  const { data: session, status } = useSession();
  const [activeSection, setActiveSection] = useState<'users' | 'staff'>('users');
  
  // User Management State
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [promoting, setPromoting] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState<string | null>(null);

  // Staff Management State
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    rank: '',
    description: '',
    image: '',
    banner: '',
    vrchatAvatar: '',
    links: '',
    order: 0
  });

  // Link modal state
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isEditLinkModalOpen, setIsEditLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [currentFormType, setCurrentFormType] = useState<'add' | 'edit'>('add');
  const [tempLinks, setTempLinks] = useState<LinkItem[]>([]);

  // Helper functions to convert between string and LinkItem[] formats
  const parseLinksString = (linksString: string): LinkItem[] => {
    if (!linksString) return [];
    return linksString.split('\n').filter(link => link.trim()).map((link, index) => {
      const cleanLink = link.trim();
      if (cleanLink.includes('|')) {
        const [label, url] = cleanLink.split('|', 2);
        return {
          id: `${index}-${Date.now()}`,
          label: label.trim(),
          url: url.trim()
        };
      } else {
        return {
          id: `${index}-${Date.now()}`,
          label: cleanLink.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0],
          url: cleanLink
        };
      }
    });
  };

  const linksToString = (links: LinkItem[]): string => {
    return links.map(link => `${link.label}|${link.url}`).join('\n');
  };

  // Link management functions
  const openLinkModal = (formType: 'add' | 'edit', existingLinks: string) => {
    setCurrentFormType(formType);
    setTempLinks(parseLinksString(existingLinks));
    setIsLinkModalOpen(true);
  };

  const handleSaveLink = (newLink: LinkItem) => {
    if (editingLink) {
      // Update existing link
      setTempLinks(prev => prev.map(link => link.id === editingLink.id ? newLink : link));
    } else {
      // Add new link
      setTempLinks(prev => [...prev, newLink]);
    }
    setEditingLink(null);
  };

  const handleDeleteLink = (linkId: string) => {
    setTempLinks(prev => prev.filter(link => link.id !== linkId));
  };

  const handleEditLink = (link: LinkItem) => {
    setEditingLink(link);
    setIsEditLinkModalOpen(true);
  };

  const handleUpdateLink = (updatedLink: LinkItem) => {
    setTempLinks(prev => prev.map(link => link.id === updatedLink.id ? updatedLink : link));
    setEditingLink(null);
    setIsEditLinkModalOpen(false);
  };

  const handleSaveAllLinks = () => {
    const linksString = linksToString(tempLinks);
    setFormData(prev => ({ ...prev, links: linksString }));
    setIsLinkModalOpen(false);
    setTempLinks([]);
    setEditingLink(null);
  };

  useEffect(() => {
    if (activeSection === 'users') {
      fetchUsers();
    } else {
      fetchStaff();
    }
  }, [activeSection]);

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

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchStaff = async () => {
    try {
      setLoadingStaff(true);
      const response = await fetch('/api/staff');
      if (response.ok) {
        const data = await response.json();
        setStaff(data.staff);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoadingStaff(false);
    }
  };

  const promoteUser = async (userId: string) => {
    setPromoting(userId);
    try {
      const response = await fetch('/api/promote-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        await fetchUsers();
      } else {
        alert('Failed to promote user');
      }
    } catch (error) {
      console.error('Error promoting user:', error);
      alert('Failed to promote user');
    } finally {
      setPromoting(null);
    }
  };

  const rejectUser = async (userId: string) => {
    setRejecting(userId);
    try {
      const response = await fetch('/api/reject-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        await fetchUsers();
      } else {
        alert('Failed to reject user');
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
      alert('Failed to reject user');
    } finally {
      setRejecting(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingStaff ? `/api/staff/${editingStaff.id}` : '/api/staff';
      const method = editingStaff ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchStaff();
        closeModal();
      } else {
        const error = await response.text();
        alert(`Error: ${response.status} - ${error}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Error: ${error}`);
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
    if (staff) {
      setEditingStaff(staff);
      setFormData({
        name: staff.name,
        rank: staff.rank || '',
        description: staff.description || '',
        image: staff.image || '',
        banner: staff.banner || '',
        vrchatAvatar: staff.vrchatAvatar || '',
        links: staff.links || '',
        order: staff.order
      });
    } else {
      setEditingStaff(null);
      setFormData({
        name: '',
        rank: '',
        description: '',
        image: '',
        banner: '',
        vrchatAvatar: '',
        links: '',
        order: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'WAITING':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'AUTHENTICATED':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'REJECTED':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Staff Administration</h1>
            <div className="text-white text-sm bg-zinc-800 px-3 py-2 rounded">
              User: {session?.user?.email} | Role: {session?.user?.role || 'Unknown'}
            </div>
          </div>

          {/* Section Switcher */}
          <div className="flex space-x-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection('users')}
              className={`flex-1 p-6 rounded-xl border cursor-pointer transition-all ${
                activeSection === 'users'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  activeSection === 'users' ? 'bg-indigo-500' : 'bg-zinc-600'
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <p className="text-sm opacity-70">Manage user accounts and roles</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection('staff')}
              className={`flex-1 p-6 rounded-xl border cursor-pointer transition-all ${
                activeSection === 'staff'
                  ? 'bg-purple-600/20 border-purple-500 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  activeSection === 'staff' ? 'bg-purple-500' : 'bg-zinc-600'
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Staff Profiles</h3>
                  <p className="text-sm opacity-70">Create and manage staff profiles</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeSection === 'users' ? (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">User Accounts</h2>
                  <div className="text-zinc-400">
                    {users.length} total users
                  </div>
                </div>

                {loadingUsers ? (
                  <div className="text-center py-8">
                    <div className="text-white">Loading users...</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {users.map((user) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-900 rounded-xl p-6 border border-white/10"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                              {user.image ? (
                                <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-full" />
                              ) : (
                                <span className="text-white font-bold text-lg">
                                  {user.name?.charAt(0) || 'U'}
                                </span>
                              )}
                            </div>
                            <div>
                              <h3 className="text-white font-semibold text-lg">
                                {user.name || 'Unknown User'}
                              </h3>
                              <p className="text-zinc-400">{user.email}</p>
                              <p className="text-sm text-zinc-500">
                                Joined: {new Date(user.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 text-sm rounded-full border ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                            
                            {user.role === 'WAITING' && (
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => promoteUser(user.id)}
                                  disabled={promoting === user.id || rejecting === user.id}
                                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                  {promoting === user.id ? 'Approving...' : 'Approve'}
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => rejectUser(user.id)}
                                  disabled={promoting === user.id || rejecting === user.id}
                                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                  {rejecting === user.id ? 'Rejecting...' : 'Reject'}
                                </motion.button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="staff"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Staff Profiles</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                  >
                    Add Staff Member
                  </motion.button>
                </div>

                {loadingStaff ? (
                  <div className="text-center py-8">
                    <div className="text-white">Loading staff...</div>
                  </div>
                ) : (
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
                          <p className="text-purple-400 text-sm">{member.rank || 'Staff'}</p>
                          {member.description && (
                            <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{member.description}</p>
                          )}
                          {member.links && (
                            <div className="mt-2">
                              <p className="text-zinc-500 text-xs">
                                {parseLinksString(member.links).length} link{parseLinksString(member.links).length !== 1 ? 's' : ''}
                              </p>
                            </div>
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
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Staff Modal */}
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
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Rank</label>
                    <select
                      value={formData.rank}
                      onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select rank (optional)</option>
                      <option value="owner">Owner</option>
                      <option value="dancer">Dancer</option>
                      <option value="mod">Mod</option>
                      <option value="admin">Admin</option>
                      <option value="security">Security</option>
                      <option value="doors">Doors</option>
                      <option value="hosts">Hosts</option>
                      <option value="devs">Devs</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Profile Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formDataUpload = new FormData();
                            formDataUpload.append('image', file);
                            
                            try {
                              const response = await fetch('/api/upload', {
                                method: 'POST',
                                body: formDataUpload
                              });
                              
                              if (response.ok) {
                                const data = await response.json();
                                setFormData({ ...formData, image: data.url });
                              } else {
                                alert('Failed to upload image');
                              }
                            } catch (error) {
                              console.error('Upload error:', error);
                              alert('Failed to upload image');
                            }
                          }
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
                      />
                      {formData.image && (
                        <div className="mt-2">
                          <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Banner Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const formDataUpload = new FormData();
                            formDataUpload.append('image', file);
                            
                            try {
                              const response = await fetch('/api/upload', {
                                method: 'POST',
                                body: formDataUpload
                              });
                              
                              if (response.ok) {
                                const data = await response.json();
                                setFormData({ ...formData, banner: data.url });
                              } else {
                                alert('Failed to upload banner');
                              }
                            } catch (error) {
                              console.error('Upload error:', error);
                              alert('Failed to upload banner');
                            }
                          }
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:cursor-pointer hover:file:bg-emerald-700"
                      />
                      {formData.banner && (
                        <div className="mt-2">
                          <img src={formData.banner} alt="Banner Preview" className="w-32 h-16 object-cover rounded-lg" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Links Section */}
                  <div>
                    <label className="block text-white font-medium mb-2">Links</label>
                    <div className="space-y-3">
                      {/* Current Links Display */}
                      <div className="min-h-[80px] bg-white/5 border border-white/10 rounded-lg p-3">
                        {formData.links ? (
                          <div className="flex flex-wrap gap-2">
                            {parseLinksString(formData.links).map((link, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs">
                                {link.label}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="text-zinc-500 text-sm text-center py-4">
                            No links added yet
                          </div>
                        )}
                      </div>
                      
                      {/* Manage Links Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => openLinkModal('add', formData.links)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                      >
                        Manage Links
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                    >
                      {editingStaff ? 'Update' : 'Create'}
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

      {/* Link Management Modal */}
      <LinkManagementModal 
        isOpen={isLinkModalOpen}
        onClose={handleSaveAllLinks}
        links={tempLinks}
        onSave={handleSaveLink}
        onEdit={handleEditLink}
        onDelete={handleDeleteLink}
      />

      {/* Edit Link Modal */}
      <EditLinkModal 
        isOpen={isEditLinkModalOpen}
        onClose={() => setIsEditLinkModalOpen(false)}
        link={editingLink}
        onSave={handleUpdateLink}
      />
    </div>
  );
} 