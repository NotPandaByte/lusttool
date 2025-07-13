'use client';

import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useProgress, Html, useGLTF, useFBX } from '@react-three/drei';
import * as THREE from 'three';

interface VRChatAvatarViewerProps {
  avatarUrl: string;
  size?: 'small' | 'medium' | 'large';
}

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="w-8 h-8 mx-auto mb-2 bg-white/10 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        <p className="text-sm">{progress.toFixed(0)}% loaded</p>
        {progress < 10 && (
          <p className="text-xs text-zinc-400 mt-1">Loading large 3D model...</p>
        )}
      </div>
    </Html>
  );
}

// 3D Model component with error handling
function Model({ url }: { url: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Determine file type and load appropriate model
  const fileExtension = url.split('.').pop()?.toLowerCase();
  let model = null;
  
  useEffect(() => {
    // Set a timeout to prevent indefinite loading
    const timeout = setTimeout(() => {
      if (isLoading) {
        setError('Model loading timeout - file may be too large');
        setIsLoading(false);
      }
    }, 30000); // 30 second timeout
    
    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Always call hooks unconditionally
  const fbxModel = useFBX(fileExtension === 'fbx' ? url : '');
  const gltfModel = useGLTF(fileExtension !== 'fbx' ? url : '');

  try {
    if (fileExtension === 'fbx' && fbxModel) {
      model = fbxModel;
      if (model && isLoading) {
        setIsLoading(false);
      }
    } else if (gltfModel) {
      // Default to GLTF for .glb and .gltf files
      model = gltfModel.scene;
      if (model && isLoading) {
        setIsLoading(false);
      }
    }
  } catch (err) {
    console.error('Error loading 3D model:', err);
    setError('Failed to load 3D model');
    setIsLoading(false);
    model = null;
  }

  useFrame(() => {
    if (meshRef.current && !error) {
      meshRef.current.rotation.y += 0.005; // Slower rotation to reduce performance impact
    }
  });

  if (error) {
    return (
      <Html center>
        <div className="text-white text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-sm text-red-400">{error}</p>
          <p className="text-xs text-zinc-500 mt-1">Try refreshing the page</p>
        </div>
      </Html>
    );
  }

  if (model) {
    // Clone the scene to avoid conflicts
    const scene = model.clone();
    
    // Scale the model to fit nicely and optimize for performance
    scene.scale.setScalar(0.3); // Smaller scale for better performance
    
    // Optimize materials for better performance
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          // Reduce material complexity for better performance
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.roughness = 0.5;
                mat.metalness = 0.1;
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = 0.5;
            child.material.metalness = 0.1;
          }
        }
        // Reduce geometry complexity if needed
        if (child.geometry && child.geometry.attributes.position.count > 50000) {
          console.warn('High poly model detected, consider using a lower poly version');
        }
      }
    });
    
    return (
      <group ref={meshRef}>
        <primitive object={scene} />
      </group>
    );
  }

  // Fallback placeholder model
  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshStandardMaterial 
          color="#8B5CF6"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <Html center>
        <div className="text-white text-center mt-20">
          <p className="text-xs text-zinc-400">3D Model Placeholder</p>
        </div>
      </Html>
    </group>
  );
}

// Error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('3D Viewer Error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-sm text-zinc-400">3D viewer error</p>
        <button 
          onClick={() => setHasError(false)}
          className="text-xs text-indigo-400 hover:text-indigo-300 mt-2"
        >
          Try again
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export function VRChatAvatarViewer({ avatarUrl, size = 'medium' }: VRChatAvatarViewerProps) {
  const [viewerError, setViewerError] = useState(false);
  
  const sizeClasses = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64'
  };

  // Check file size before loading (if possible)
  useEffect(() => {
    const checkFileSize = async () => {
      try {
        const response = await fetch(avatarUrl, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        if (contentLength) {
          const fileSizeInMB = parseInt(contentLength) / (1024 * 1024);
          if (fileSizeInMB > 50) {
            console.warn(`Large 3D model detected: ${fileSizeInMB.toFixed(1)}MB`);
          }
        }
      } catch (error) {
        console.warn('Could not check file size:', error);
      }
    };
    
    checkFileSize();
  }, [avatarUrl]);

  if (viewerError) {
    return (
      <div className={`${sizeClasses[size]} w-full`}>
        <div className="flex flex-col items-center justify-center h-full text-white">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-sm text-zinc-400">Avatar unavailable</p>
          <button 
            onClick={() => setViewerError(false)}
            className="text-xs text-indigo-400 hover:text-indigo-300 mt-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} w-full`}>
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          style={{ background: 'transparent' }}
          performance={{ min: 0.5 }} // Allow lower framerate for performance
          onError={() => setViewerError(true)}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.3} />
          
          <Suspense fallback={<Loader />}>
            <Model url={avatarUrl} />
          </Suspense>
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1} // Slower auto-rotation
            maxPolarAngle={Math.PI * 0.8}
            minPolarAngle={Math.PI * 0.2}
          />
          
          <Environment preset="studio" />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
} 