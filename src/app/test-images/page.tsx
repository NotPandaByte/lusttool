'use client';

import { useState, useEffect } from 'react';
import { ImageDebugger } from '../components/ImageDebugger';

export default function TestImagesPage() {
  const [testImages, setTestImages] = useState<string[]>([]);

  useEffect(() => {
    // Test known images from the public directory
    const knownImages = [
      '/VRChat_2025-07-10_21-06-26.953_3840x2160.png', // Known public image
      '/staff-images/1752435625582-konachan_random_image.png', // Known uploaded image
      '/staff-images/1752435617929-509d0962b936ffb6d85a3ed6af72c1e9.jpg', // Known uploaded image
    ];
    setTestImages(knownImages);
  }, []);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Image Loading Test</h1>
        
        <div className="space-y-8">
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Test Images</h2>
            <p className="text-zinc-400 mb-6">
              Testing various image paths to diagnose loading issues. Check console for detailed logs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testImages.map((imageUrl, index) => (
                <div key={index} className="bg-zinc-800 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-3">
                    Test Image {index + 1}
                  </h3>
                  <ImageDebugger 
                    imageUrl={imageUrl}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Manual Test</h2>
            <p className="text-zinc-400 mb-4">
              Enter any image URL to test:
            </p>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter image URL (e.g., /staff-images/filename.jpg)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement;
                    if (input.value && !testImages.includes(input.value)) {
                      setTestImages([...testImages, input.value]);
                      input.value = '';
                    }
                  }
                }}
              />
              <p className="text-xs text-zinc-500">
                Press Enter to add the URL to the test grid above
              </p>
            </div>
          </div>
          
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Debugging Tips</h2>
            <ul className="text-zinc-400 space-y-2 text-sm">
              <li>• Check the browser console for detailed logs</li>
              <li>• Green border = Image loaded successfully</li>
              <li>• Red border = Image failed to load</li>
              <li>• Yellow border = Image is still loading</li>
              <li>• Click "Show Debug" on any image for detailed information</li>
              <li>• Try opening the "Open in new tab" links to test direct access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 