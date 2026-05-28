import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const HolographicRing = ({ radius = 1.6, tube = 0.015, color = '#C9A84C' }) => {
  const ringRef1 = useRef(null);
  const ringRef2 = useRef(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate rings at opposite speeds and angles
    if (ringRef1.current) {
      ringRef1.current.rotation.z = time * 0.15;
      ringRef1.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.2) * 0.05;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -time * 0.22;
      ringRef2.current.rotation.y = Math.cos(time * 0.15) * 0.08;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Outer Ring */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[radius, tube, 8, 64]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.4} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner offset Ring */}
      <mesh ref={ringRef2} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[radius * 0.85, tube * 0.5, 8, 48]} />
        <meshBasicMaterial 
          color="#F5F0E8" 
          transparent 
          opacity={0.2} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default HolographicRing;
