import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const AvatarModel = ({ isScanning = false, colorScheme = '#C9A84C' }) => {
  const modelRef = useRef(null);
  
  // Custom GLSL Hologram Scanner shaders
  const hologramShader = useMemo(() => {
    return {
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying float vModelY;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          vModelY = position.y; // Keep track of relative heights for laser scan sweeps
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uScanlineSpeed;
        uniform float uIsScanning;
        uniform float uScanProgress; // 0.0 to 1.0 vertical scan sweep
        
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying float vModelY;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          // 1. Fresnel iridescence glow
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
          vec3 iridescent = mix(vec3(0.2, 0.8, 0.9), vec3(0.9, 0.8, 0.2), fresnel);

          // 2. Animated holographic raster lines (horizontal stripes)
          float scanline = sin(vModelY * 30.0 - uTime * uScanlineSpeed * 5.0) * 0.5 + 0.5;

          // 3. Ambient cyber breathing pulses
          float pulse = sin(uTime * 1.5) * 0.15 + 0.85;

          // 4. Scanning laser sweep overlay
          float laserScan = 0.0;
          if (uIsScanning > 0.5) {
            // Check closeness of pixel Y to scanProgress boundaries (-1.5 to 1.5 range)
            float targetY = 1.5 - (uScanProgress * 3.0);
            float distanceToSweep = abs(vModelY - targetY);
            if (distanceToSweep < 0.08) {
              laserScan = (0.08 - distanceToSweep) * 12.0; // Highly luminous laser line
            }
          }

          // Combine lighting layers
          vec3 baseColor = uColor;
          vec3 hologramColor = mix(baseColor, iridescent, fresnel);
          
          // Apply scans overlays
          vec3 finalColor = hologramColor * (scanline * 0.4 + 0.6) * pulse;
          
          // If laser sweep is active, blend bright cyber neon green highlights
          if (laserScan > 0.0) {
            finalColor = mix(finalColor, vec3(0.1, 1.0, 0.4), laserScan);
          }

          gl_FragColor = vec4(finalColor, fresnel * 0.55 + 0.15 + (laserScan * 0.4));
        }
      `
    };
  }, []);

  // Set up uniforms for frame animations
  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(colorScheme) },
      uScanlineSpeed: { value: 1.0 },
      uIsScanning: { value: 0 },
      uScanProgress: { value: 0 }
    };
  }, [colorScheme]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Update uniforms
    uniforms.uTime.value = time;
    uniforms.uColor.value.set(colorScheme);

    // Subtle breathing scale Y oscillation
    if (modelRef.current) {
      modelRef.current.scale.y = 1.0 + Math.sin(time * 1.5) * 0.015;
      
      // Auto-rotation
      modelRef.current.rotation.y = time * 0.08;
    }

    // Handle scanning sweep animations
    if (isScanning) {
      uniforms.uIsScanning.value = 1.0;
      // Cycle from 0 to 1 every 2 seconds
      uniforms.uScanProgress.value = (time * 0.5) % 1.0;
    } else {
      uniforms.uIsScanning.value = 0.0;
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.6, 0]}>
      {/* 1. Torso: Capsule geometry */}
      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.3, 0.6, 8, 24]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. Head: Sphere geometry */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Limbs & Shoulders (Cylinders & Spheres) */}
      {/* Left Shoulder */}
      <mesh position={[-0.42, 0.9, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
        />
      </mesh>

      {/* Right Shoulder */}
      <mesh position={[0.42, 0.9, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
        />
      </mesh>

      {/* Left Arm Upper */}
      <mesh position={[-0.48, 0.65, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.45, 12]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
        />
      </mesh>

      {/* Right Arm Upper */}
      <mesh position={[0.48, 0.65, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.45, 12]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
        />
      </mesh>

      {/* Hip Joints */}
      <mesh position={[-0.2, 0.3, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0.2, 0.3, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
        />
      </mesh>

      {/* Left Leg Upper */}
      <mesh position={[-0.2, 0.0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.55, 12]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
        />
      </mesh>

      {/* Right Leg Upper */}
      <mesh position={[0.2, 0.0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.55, 12]} />
        <shaderMaterial
          vertexShader={hologramShader.vertexShader}
          fragmentShader={hologramShader.fragmentShader}
          transparent
          uniforms={uniforms}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default AvatarModel;
