'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { VRChatAvatarViewer } from '../../staff/components/VRChatAvatarViewer';
import { ImageDebugger } from '../../components/ImageDebugger';

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
  rank?: string;
  description?: string;
  image?: string;
  banner?: string;
  vrchatAvatar?: string;
  links?: string;
  order: number;
  createdAt: string;
}

interface LinkItem {
  label: string;
  url: string;
  id: string;
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
          transition={smoothTransition}
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
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
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
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
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
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
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
                                  ? 'bg-indigo-600 text-white'
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
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
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
          transition={smoothTransition}
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
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                          ? 'bg-indigo-600 text-white'
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
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
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

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [waitingUsers, setWaitingUsers] = useState<User[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoting, setPromoting] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState<string | null>(null);
  const [deletingStaff, setDeletingStaff] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'staff'>('users');
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [staffForm, setStaffForm] = useState({
    name: '',
    rank: '',
    description: '',
    image: '',
    banner: '',
    vrchatAvatar: '',
    links: '',
    order: 0
  });
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editForm, setEditForm] = useState({
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
    if (currentFormType === 'add') {
      setStaffForm(prev => ({ ...prev, links: linksString }));
    } else {
      setEditForm(prev => ({ ...prev, links: linksString }));
    }
    setIsLinkModalOpen(false);
    setTempLinks([]);
    setEditingLink(null);
  };

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

  const rejectUser = async (userId: string) => {
    setRejecting(userId);
    try {
      const response = await fetch('/api/reject-user', {
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
      console.error('Error rejecting user:', error);
      alert('Error rejecting user');
    } finally {
      setRejecting(null);
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
        setStaffForm({ name: '', rank: '', description: '', image: '', banner: '', vrchatAvatar: '', links: '', order: 0 });
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

  const handleFileUpload = async (file: File, type: 'image' | 'model', category: string = 'staff') => {
    console.log('Starting file upload:', { fileName: file.name, fileSize: file.size, type, category });
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('category', category);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        console.log('Image URL generated:', data.url);
        console.log('Full URL would be:', `${window.location.origin}${data.url}`);
        return data.url;
      } else {
        const errorResponse = await response.json();
        console.error('Upload failed with response:', errorResponse);
        alert(`Upload error: ${errorResponse.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload error: ${error}`);
    }
    return null;
  };

  const openEditModal = (staff: Staff) => {
    setEditingStaff(staff);
    setEditForm({
      name: staff.name,
      rank: staff.rank || '',
      description: staff.description || '',
      image: staff.image || '',
      banner: staff.banner || '',
      vrchatAvatar: staff.vrchatAvatar || '',
      links: staff.links || '',
      order: staff.order
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingStaff(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;
    
    setUploading(true);
    try {
      const response = await fetch(`/api/staff/${editingStaff.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedStaff = await response.json();
        setStaff(prev => prev.map(member => 
          member.id === editingStaff.id ? updatedStaff.staff : member
        ));
        closeEditModal();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      alert('Error updating staff member');
    } finally {
      setUploading(false);
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
                                <div className="flex items-center space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => promoteUser(user.id)}
                                    disabled={promoting === user.id || rejecting === user.id}
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
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => rejectUser(user.id)}
                                    disabled={rejecting === user.id || promoting === user.id}
                                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg animate-smooth font-medium glow-subtle btn-hover"
                                  >
                                    {rejecting === user.id ? (
                                      <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 spinner"></div>
                                        <span>Rejecting...</span>
                                      </div>
                                    ) : (
                                      'Reject'
                                    )}
                                  </motion.button>
                                </div>
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
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Rank</label>
                            <select
                              value={staffForm.rank}
                              onChange={(e) => setStaffForm(prev => ({ ...prev, rank: e.target.value }))}
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus-ring animate-smooth"
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
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Profile Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setUploading(true);
                                  const url = await handleFileUpload(file, 'image');
                                  if (url) {
                                    setStaffForm(prev => ({ ...prev, image: url }));
                                  }
                                  setUploading(false);
                                }
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer hover:file:bg-indigo-700 transition-all"
                            />
                            {staffForm.image && (
                              <div className="mt-3">
                                <ImageDebugger 
                                  imageUrl={staffForm.image} 
                                  className="w-16 h-16 object-cover rounded-lg border border-white/20" 
                                />
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">Banner Image</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setUploading(true);
                                  const url = await handleFileUpload(file, 'image');
                                  if (url) {
                                    setStaffForm(prev => ({ ...prev, banner: url }));
                                  }
                                  setUploading(false);
                                }
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:cursor-pointer hover:file:bg-emerald-700 transition-all"
                            />
                            {staffForm.banner && (
                              <div className="mt-3">
                                <img src={staffForm.banner} alt="Banner Preview" className="w-32 h-16 object-cover rounded-lg border border-white/20" />
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">VRChat Avatar (FBX/GLB/GLTF)</label>
                            <input
                              type="file"
                              accept=".fbx,.glb,.gltf"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setUploading(true);
                                  const url = await handleFileUpload(file, 'model');
                                  if (url) {
                                    setStaffForm(prev => ({ ...prev, vrchatAvatar: url }));
                                  }
                                  setUploading(false);
                                }
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700 transition-all"
                            />
                            {staffForm.vrchatAvatar && (
                              <div className="mt-3">
                                <div className="text-sm text-green-400">✓ VRChat Avatar uploaded</div>
                              </div>
                            )}
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
                          <label className="block text-sm font-medium text-zinc-300 mb-2">Links</label>
                          <div className="space-y-3">
                            {/* Current Links Display */}
                            <div className="min-h-[80px] bg-white/5 border border-white/10 rounded-lg p-3">
                              {staffForm.links ? (
                                <div className="flex flex-wrap gap-2">
                                  {parseLinksString(staffForm.links).map((link, index) => (
                                    <span key={index} className="inline-flex items-center px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-md text-xs">
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
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => openLinkModal('add', staffForm.links)}
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium animate-smooth btn-hover text-sm"
                            >
                              Manage Links
                            </motion.button>
                          </div>
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
                              className="bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 animate-smooth cursor-pointer group relative overflow-hidden"
                              onClick={() => openEditModal(member)}
                            >
                              {/* Banner Header */}
                              <div className="relative h-16 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 overflow-hidden">
                                {member.banner ? (
                                  <div className="absolute inset-0">
                                    <img 
                                      src={member.banner} 
                                      alt={`${member.name} banner`}
                                      className="w-full h-full object-cover opacity-40"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                                  </div>
                                ) : member.image && (
                                  <div className="absolute inset-0">
                                    <img 
                                      src={member.image} 
                                      alt={member.name}
                                      className="w-full h-full object-cover opacity-30"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                                  </div>
                                )}
                                
                                {/* Profile Image and Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <div className="flex items-end space-x-3">
                                    <motion.div 
                                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center overflow-hidden border border-white/30"
                                      whileHover={{ scale: 1.05 }}
                                      transition={smoothTransition}
                                    >
                                      {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                      ) : (
                                        <span className="text-white font-bold text-sm">
                                          {member.name.charAt(0)}
                                        </span>
                                      )}
                                    </motion.div>
                                    
                                    <div className="flex-1">
                                      <h3 className="font-semibold text-white text-base">
                                        {member.name}
                                      </h3>
                                      <p className="text-indigo-300 text-xs">{member.rank || 'Staff'}</p>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="absolute top-2 right-2 flex items-center space-x-2">
                                  {/* Edit hint */}
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </div>
                                  
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteStaff(member.id);
                                    }}
                                    disabled={deletingStaff === member.id}
                                    className="w-6 h-6 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-md flex items-center justify-center animate-smooth disabled:opacity-50"
                                  >
                                    {deletingStaff === member.id ? (
                                      <div className="w-3 h-3 spinner"></div>
                                    ) : (
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    )}
                                  </motion.button>
                                </div>
                              </div>
                              
                              {/* Content Area */}
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  {member.rank && (
                                    <div className="inline-flex items-center px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-md text-xs font-medium border border-yellow-500/30">
                                      {member.rank}
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center space-x-2">
                                    {member.image && (
                                      <div className="w-2 h-2 bg-green-400 rounded-full" title="Has profile image"></div>
                                    )}
                                    {member.banner && (
                                      <div className="w-2 h-2 bg-orange-400 rounded-full" title="Has banner"></div>
                                    )}
                                    {member.vrchatAvatar && (
                                      <div className="w-2 h-2 bg-purple-400 rounded-full" title="Has VRChat avatar"></div>
                                    )}
                                  </div>
                                </div>
                                
                                {member.description && (
                                  <p className="text-zinc-400 text-sm mb-2 leading-relaxed line-clamp-2">{member.description}</p>
                                )}
                                
                                <p className="text-zinc-500 text-xs">
                                  Order: {member.order}
                                </p>
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

      {/* Edit Staff Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingStaff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeEditModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={smoothTransition}
              className="bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Edit Staff Member</h2>
                    <p className="text-zinc-400 text-sm">Update staff information and avatar</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeEditModal}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Form */}
                  <div>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div>
                        <label className="block text-white font-medium mb-2">Name *</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          required
                        />
                      </div>



                      <div>
                        <label className="block text-white font-medium mb-2">Rank</label>
                        <select
                          value={editForm.rank}
                          onChange={(e) => setEditForm({ ...editForm, rank: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none transition-all"
                          placeholder="Brief description about this staff member..."
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Links</label>
                        <div className="space-y-3">
                          {/* Current Links Display */}
                          <div className="min-h-[80px] bg-white/5 border border-white/10 rounded-lg p-3">
                            {editForm.links ? (
                              <div className="flex flex-wrap gap-2">
                                {parseLinksString(editForm.links).map((link, index) => (
                                  <span key={index} className="inline-flex items-center px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-md text-xs">
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
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openLinkModal('edit', editForm.links)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium animate-smooth btn-hover text-sm"
                          >
                            Manage Links
                          </motion.button>
                        </div>
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
                                setEditForm({ ...editForm, image: url });
                              }
                              setUploading(false);
                            }
                          }}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer hover:file:bg-indigo-700 transition-all"
                        />
                        {editForm.image && (
                          <div className="mt-3">
                            <img src={editForm.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-white/20" />
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
                              setUploading(true);
                              const url = await handleFileUpload(file, 'image');
                              if (url) {
                                setEditForm({ ...editForm, banner: url });
                              }
                              setUploading(false);
                            }
                          }}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white file:cursor-pointer hover:file:bg-emerald-700 transition-all"
                        />
                        {editForm.banner && (
                          <div className="mt-3">
                            <img src={editForm.banner} alt="Banner Preview" className="w-32 h-16 object-cover rounded-lg border border-white/20" />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">VRChat Avatar (FBX/GLB/GLTF)</label>
                        <input
                          type="file"
                          accept=".fbx,.glb,.gltf"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploading(true);
                              const url = await handleFileUpload(file, 'model');
                              if (url) {
                                setEditForm({ ...editForm, vrchatAvatar: url });
                              }
                              setUploading(false);
                            }
                          }}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700 transition-all"
                        />
                        {editForm.vrchatAvatar && (
                          <div className="mt-3">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <p className="text-green-400 text-sm">
                                ✓ 3D Model uploaded ({editForm.vrchatAvatar.split('.').pop()?.toUpperCase()})
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Display Order</label>
                        <input
                          type="number"
                          value={editForm.order}
                          onChange={(e) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          placeholder="0"
                        />
                      </div>

                      <div className="flex space-x-4 pt-6">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={uploading}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          {uploading ? (
                            <>
                              <div className="w-4 h-4 spinner"></div>
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <span>Update Staff Member</span>
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={closeEditModal}
                          className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </form>
                  </div>

                  {/* Avatar Preview */}
                  <div className="flex flex-col">
                    <h3 className="text-white font-semibold mb-4">Avatar Preview</h3>
                    <div className="flex-1 bg-black/30 rounded-xl border border-white/10 flex items-center justify-center min-h-[400px]">
                      {editForm.vrchatAvatar ? (
                        <VRChatAvatarViewer avatarUrl={editForm.vrchatAvatar} size="large" />
                      ) : (
                        <div className="text-center p-8">
                          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <p className="text-zinc-400 text-sm">No 3D avatar uploaded</p>
                          <p className="text-zinc-500 text-xs mt-1">Upload an FBX, GLB, or GLTF file to see it here</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Current Staff Info */}
                    <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                      <h4 className="text-white font-medium mb-3">Current Info</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Name:</span>
                          <span className="text-white">{editingStaff.name}</span>
                        </div>

                        {editingStaff.rank && (
                          <div className="flex justify-between">
                            <span className="text-zinc-400">Rank:</span>
                            <span className="text-yellow-400">{editingStaff.rank}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Order:</span>
                          <span className="text-white">{editingStaff.order}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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