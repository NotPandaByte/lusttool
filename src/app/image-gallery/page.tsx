'use client';

import { useState } from 'react';
import { ImageGallery } from '../components/ImageGallery';
import { motion } from 'framer-motion';

export default function ImageGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string>('');

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Image Gallery
            </h1>
            <p className="text-zinc-400">
              Upload and manage your images
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Your Images
                </h2>
                <ImageGallery
                  onImageSelect={setSelectedImage}
                  category="general"
                  maxSelection={1}
                />
              </div>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Selected Image
                </h2>
                
                {selectedImage ? (
                  <div className="space-y-4">
                    <div className="aspect-square rounded-lg overflow-hidden border border-white/20">
                      <img
                        src={selectedImage}
                        alt="Selected image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-2">Usage</h3>
                      <p className="text-zinc-400 text-sm mb-3">
                        You can now use this image anywhere on your website:
                      </p>
                      
                      <div className="bg-black/50 rounded-lg p-3 border border-white/10">
                        <code className="text-green-400 text-xs break-all">
                          {selectedImage}
                        </code>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigator.clipboard.writeText(selectedImage)}
                        className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                      >
                        Copy URL
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-zinc-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-zinc-400 text-sm">
                        Select an image to preview
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">
                How to Use
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Upload Images</h3>
                  <p className="text-zinc-400 text-sm">
                    Click the upload area or drag and drop images. Supports PNG, JPG, GIF, and WebP formats up to 50MB.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-2">Use Anywhere</h3>
                  <p className="text-zinc-400 text-sm">
                    Once uploaded, you can use the image URL in any part of your website - staff profiles, banners, content, etc.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-2">Automatic Organization</h3>
                  <p className="text-zinc-400 text-sm">
                    Images are automatically organized into categories (staff vs general) and stored securely.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-2">Responsive</h3>
                  <p className="text-zinc-400 text-sm">
                    All uploaded images work perfectly on desktop and mobile devices with optimized loading.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 