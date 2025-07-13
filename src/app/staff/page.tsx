'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';

interface Staff {
  id: string;
  name: string;
  position: string;
  description?: string;
  image?: string;
  order: number;
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

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchStaff();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            />
          </div>
          <p className="text-white/70">Loading staff...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={gentleTransition}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ...gentleTransition }}
            className="text-4xl font-bold text-white mb-12 text-center"
          >
            Our Staff
          </motion.h1>
          
          <AnimatePresence mode="popLayout">
            {staff.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={gentleTransition}
                className="text-center py-16"
              >
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, ...smoothTransition }}
                >
                  <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-semibold text-white mb-4">No Staff Members Yet</h2>
                <p className="text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Staff members will appear here once they are added to the system.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member, index) => (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1 + index * 0.05, ...gentleTransition }}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 animate-smooth scale-hover group"
                  >
                    <div className="text-center">
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={smoothTransition}
                      >
                        <span className="text-white font-bold text-lg">
                          {member.name.charAt(0)}
                        </span>
                      </motion.div>
                      <h3 className="text-white font-semibold text-lg mb-2">{member.name}</h3>
                      <p className="text-zinc-400 text-sm mb-4">{member.position}</p>
                      {member.description && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-zinc-300 text-sm leading-relaxed"
                        >
                          {member.description}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 