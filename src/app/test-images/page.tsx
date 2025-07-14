'use client';

import { useState, useEffect } from 'react';
import { ImageDebugger } from '../components/ImageDebugger';
import UploadTest from '../components/UploadTest';

export default function TestImagesPage() {
  const [testImages, setTestImages] = useState<string[]>([]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  useEffect(() => {
    // Start with empty array - no hardcoded paths
    setTestImages([]);
  }, []);

  const addTestImage = () => {
    if (customImageUrl.trim()) {
      setTestImages(prev => [...prev, customImageUrl.trim()]);
      setCustomImageUrl('');
    }
  };

  const removeTestImage = (index: number) => {
    setTestImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Image Loading Test</h1>
        
        <div className="mb-8">
          <UploadTest />
        </div>
        
        <div className="bg-zinc-900 rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Add Test Image</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="Enter image URL (e.g., /staff-images/filename.jpg)"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={addTestImage}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testImages.map((imageUrl, index) => (
            <div key={index} className="bg-zinc-900 rounded-xl p-4 border border-white/10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-medium text-sm truncate flex-1 mr-2">
                  {imageUrl}
                </h3>
                <button
                  onClick={() => removeTestImage(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>
              <ImageDebugger 
                imageUrl={imageUrl} 
                className="w-full h-48 object-cover rounded-lg border border-white/20" 
              />
            </div>
          ))}
        </div>

        {testImages.length === 0 && (
          <div className="text-center text-zinc-400 mt-8">
            <p>No test images added yet. Add an image URL above to test image loading.</p>
          </div>
        )}
      </div>
    </div>
  );
} 