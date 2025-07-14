'use client';

import { useState } from 'react';

export default function UploadTest() {
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('Uploaded image URL:', data.url);
      setUploadedUrl(data.url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-white/10">
      <h3 className="text-white font-bold text-lg mb-4">Upload Test</h3>
      
      <input 
        type="file" 
        onChange={handleUpload}
        accept="image/*,.fbx,.glb,.gltf"
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer hover:file:bg-indigo-700"
      />
      
      {uploading && (
        <div className="mt-4 text-indigo-400">Uploading...</div>
      )}
      
      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-green-400 mb-2">Upload successful!</p>
          <p className="text-white text-sm mb-2">URL: {uploadedUrl}</p>
          {uploadedUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
            <img 
              src={uploadedUrl} 
              alt="Uploaded" 
              className="w-32 h-32 object-cover rounded-lg border border-white/20" 
            />
          )}
        </div>
      )}
    </div>
  );
} 