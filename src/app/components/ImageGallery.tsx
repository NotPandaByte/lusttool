'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageItem {
  url: string;
  filename: string;
  originalName: string;
  size: number;
  uploadDate: string;
}

interface ImageGalleryProps {
  onImageSelect?: (imageUrl: string) => void;
  category?: 'staff' | 'general';
  maxSelection?: number;
}

export function ImageGallery({ onImageSelect, category = 'general', maxSelection = 1 }: ImageGalleryProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'image');
    formData.append('category', category);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        const newImage: ImageItem = {
          url: data.url,
          filename: data.filename,
          originalName: data.originalName,
          size: data.size,
          uploadDate: new Date().toISOString()
        };
        
        setImages(prev => [newImage, ...prev]);
        
        if (onImageSelect) {
          onImageSelect(data.url);
        }
      } else {
        const errorResponse = await response.json();
        alert(`Upload error: ${errorResponse.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload error: ${error}`);
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    if (maxSelection === 1) {
      setSelectedImages([imageUrl]);
      if (onImageSelect) {
        onImageSelect(imageUrl);
      }
    } else {
      setSelectedImages(prev => {
        const newSelection = prev.includes(imageUrl) 
          ? prev.filter(url => url !== imageUrl)
          : [...prev, imageUrl].slice(0, maxSelection);
        
        if (onImageSelect) {
          onImageSelect(newSelection[newSelection.length - 1] || '');
        }
        
        return newSelection;
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileUpload(file);
            }
          }}
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className="cursor-pointer block"
        >
          <div className="flex flex-col items-center space-y-2">
            {uploading ? (
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
            <p className="text-white font-medium">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </p>
            <p className="text-zinc-400 text-sm">
              PNG, JPG, GIF, WebP up to 50MB
            </p>
          </div>
        </label>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {images.map((image, index) => (
            <motion.div
              key={image.url}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                selectedImages.includes(image.url)
                  ? 'border-indigo-500 ring-2 ring-indigo-500/50'
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => handleImageSelect(image.url)}
            >
              <img
                src={image.url}
                alt={image.originalName}
                className="w-full h-full object-cover"
              />
              
              {/* Selection Indicator */}
              {selectedImages.includes(image.url) && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-xs font-medium truncate">
                  {image.originalName}
                </p>
                <p className="text-zinc-300 text-xs">
                  {formatFileSize(image.size)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {images.length === 0 && !loading && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-zinc-400">No images uploaded yet</p>
          <p className="text-zinc-500 text-sm mt-1">Upload your first image to get started</p>
        </div>
      )}
    </div>
  );
} 