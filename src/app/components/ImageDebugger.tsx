'use client';

import { useState } from 'react';

interface ImageDebuggerProps {
  imageUrl: string;
  className?: string;
}

export function ImageDebugger({ imageUrl, className = "w-16 h-16 object-cover rounded-lg" }: ImageDebuggerProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  if (!imageUrl) {
    return (
      <div className={`${className} bg-zinc-700 flex items-center justify-center`}>
        <span className="text-zinc-400 text-xs">No Image</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt="Preview" 
          className={`${className} ${imageError ? 'border-2 border-red-500' : imageLoaded ? 'border-2 border-green-500' : 'border-2 border-yellow-500'}`}
          onLoad={() => {
            setImageLoaded(true);
            setImageError(false);
          }}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
            console.error('Image failed to load:', imageUrl);
          }}
        />
        
        {/* Status Indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full">
          {imageError && <div className="w-full h-full bg-red-500" title="Failed to load" />}
          {imageLoaded && <div className="w-full h-full bg-green-500" title="Loaded successfully" />}
          {!imageLoaded && !imageError && <div className="w-full h-full bg-yellow-500 animate-pulse" title="Loading..." />}
        </div>
      </div>
      
      {/* Debug Toggle */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="text-xs text-zinc-400 hover:text-white transition-colors"
      >
        {showDebug ? 'Hide' : 'Show'} Debug
      </button>
      
      {/* Debug Info */}
      {showDebug && (
        <div className="bg-zinc-800 p-3 rounded text-xs space-y-2 border border-zinc-700">
          <div>
            <span className="text-zinc-400">Status:</span>
            <span className={`ml-2 ${imageError ? 'text-red-400' : imageLoaded ? 'text-green-400' : 'text-yellow-400'}`}>
              {imageError ? 'Error' : imageLoaded ? 'Loaded' : 'Loading'}
            </span>
          </div>
          
          <div>
            <span className="text-zinc-400">URL:</span>
            <span className="ml-2 text-white break-all">{imageUrl}</span>
          </div>
          
          <div>
            <span className="text-zinc-400">Full URL:</span>
            <span className="ml-2 text-white break-all">
              {typeof window !== 'undefined' ? `${window.location.origin}${imageUrl}` : imageUrl}
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="text-zinc-400">Test Links:</div>
            <a 
              href={imageUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-blue-400 hover:text-blue-300 underline"
            >
              Open in new tab
            </a>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open(`${window.location.origin}${imageUrl}`, '_blank');
                }
              }}
              className="block text-blue-400 hover:text-blue-300 underline"
            >
              Open full URL
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 