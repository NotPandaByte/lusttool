'use client';

import { useRef, useState, Suspense } from 'react';
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
      </div>
    </Html>
  );
}

// 3D Model component
function Model({ url }: { url: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Determine file type and load appropriate model
  const fileExtension = url.split('.').pop()?.toLowerCase();
  let model = null;
  
  try {
    if (fileExtension === 'fbx') {
      model = useFBX(url);
    } else {
      // Default to GLTF for .glb and .gltf files
      const gltf = useGLTF(url);
      model = gltf.scene;
    }
  } catch (error) {
    // Fallback to placeholder if loading fails
    model = null;
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (model) {
    // Clone the scene to avoid conflicts
    const scene = model.clone();
    
    // Scale the model to fit nicely
    scene.scale.setScalar(0.5);
    
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
    </group>
  );
}

// Error fallback component
function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-sm text-zinc-400">Avatar unavailable</p>
    </div>
  );
}

export function VRChatAvatarViewer({ avatarUrl, size = 'medium' }: VRChatAvatarViewerProps) {
  const [error, setError] = useState(false);
  
  const sizeClasses = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64'
  };

  if (error) {
    return (
      <div className={`${sizeClasses[size]} w-full`}>
        <ErrorFallback />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} w-full`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          <Model url={avatarUrl} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={2}
        />
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
} 