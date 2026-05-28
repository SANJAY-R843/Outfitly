import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingFabrics = () => {
  const fabricsCount = 8;
  const meshesRef = useRef([]);
  const { mouse } = useThree();

  // Custom GLSL shaders for silk/gold rippling fabric
  const fabricShader = useMemo(() => {
    return {
      vertexShader: `
        uniform float uTime;
        uniform float uWaveFrequency;
        uniform float uWaveAmplitude;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          // Animate plane vertices procedurally using sine/cosine sum waves
          vec3 newPos = position;
          float wave = sin(position.x * uWaveFrequency + uTime * 1.5) * 
                       cos(position.y * uWaveFrequency * 0.8 + uTime) * uWaveAmplitude;
          newPos.z += wave;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uShimmer;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
          // Specular Fresnel Highlight
          vec3 viewDirection = normalize(vec3(0.0, 0.0, 1.0));
          float fresnel = pow(1.0 - max(dot(vNormal, viewDirection), 0.0), 3.0);
          
          vec3 finalColor = mix(uColor, vec3(1.0, 0.9, 0.7), fresnel * uShimmer);
          gl_FragColor = vec4(finalColor, 0.85);
        }
      `
    };
  }, []);

  // Pre-calculate physical locations of ribbons
  const fabricRibbons = useMemo(() => {
    const ribbons = [];
    const colors = [
      new THREE.Color('#0A0A0B'),
      new THREE.Color('#C9A84C'),
      new THREE.Color('#F5F0E8')
    ];

    for (let i = 0; i < fabricsCount; i++) {
      ribbons.push({
        id: `fabric-${i}`,
        position: [
          (Math.random() - 0.5) * 6, // X
          (Math.random() - 0.5) * 4, // Y
          (Math.random() - 0.5) * 2 - 1.5 // Z
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        scale: [
          0.3 + Math.random() * 0.4, // Width
          1.2 + Math.random() * 1.0, // Length
          1
        ],
        color: colors[i % colors.length],
        waveFrequency: 2.0 + Math.random() * 2.0,
        waveAmplitude: 0.1 + Math.random() * 0.15,
        shimmer: i % 2 === 0 ? 0.8 : 0.2
      });
    }
    return ribbons;
  }, [fabricsCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    fabricRibbons.forEach((ribbon, index) => {
      const mesh = meshesRef.current[index];
      if (!mesh) return;

      // Update time uniform in shaders
      mesh.material.uniforms.uTime.value = time;

      // Spring float oscillation Y axis
      mesh.position.y = ribbon.position[1] + Math.sin(time * 0.4 + index) * 0.15;
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.001;

      // Repel from cursor raycast
      const distanceVec = new THREE.Vector3().copy(mesh.position);
      const tempVector = new THREE.Vector3(mouse.x * 3, mouse.y * 2, mesh.position.z);
      const distance = tempVector.distanceTo(mesh.position);
      
      if (distance < 1.8) {
        // Compute push away direction
        const repelDir = new THREE.Vector3().subVectors(mesh.position, tempVector).normalize();
        mesh.position.addScaledVector(repelDir, 0.03); // Repel vector
      }
    });
  });

  return (
    <group>
      {fabricRibbons.map((rib, idx) => (
        <mesh
          key={rib.id}
          ref={(el) => (meshesRef.current[idx] = el)}
          position={rib.position}
          rotation={rib.rotation}
          scale={rib.scale}
        >
          {/* Subdivided 20x20 mesh plane */}
          <planeGeometry args={[1, 1, 20, 20]} />
          
          <shaderMaterial
            vertexShader={fabricShader.vertexShader}
            fragmentShader={fabricShader.fragmentShader}
            transparent
            side={THREE.DoubleSide}
            uniforms={{
              uTime: { value: 0 },
              uColor: { value: rib.color },
              uWaveFrequency: { value: rib.waveFrequency },
              uWaveAmplitude: { value: rib.waveAmplitude },
              uShimmer: { value: rib.shimmer }
            }}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingFabrics;
