import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleField = ({ count = 3000 }) => {
  const pointsRef = useRef(null);

  const [positions, sizes, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = Math.cbrt(Math.random()) * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi);
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      siz[i] = 4 + Math.random() * 6;
      spd[i] = 0.02 + Math.random() * 0.05;
      phs[i] = Math.random() * Math.PI * 2;
    }

    return [pos, siz, spd, phs];
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const positionsArray = points.geometry.attributes.position.array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      positionsArray[i * 3 + 1] += speeds[i];
      positionsArray[i * 3] += Math.sin(time + phases[i]) * 0.002;
      positionsArray[i * 3 + 2] += Math.cos(time + phases[i]) * 0.002;

      if (positionsArray[i * 3 + 1] > 4.5) {
        positionsArray[i * 3 + 1] = -4.5;
      }
    }

    points.geometry.attributes.position.needsUpdate = true;
    points.material.uniforms.uTime.value = time;
  });

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec3 vPosition;
      void main() {
        vec2 uv = gl_PointCoord.xy - 0.5;
        float d = length(uv);
        float alpha = smoothstep(0.5, 0.0, d);
        vec3 gold = vec3(0.788, 0.659, 0.298);
        float shift = 0.5 + 0.5 * sin(uTime * 0.6 + vPosition.x * 0.6);
        vec3 color = mix(gold, vec3(1.0), shift * 0.25);
        gl_FragColor = vec4(color, alpha);
      }
    `
  }), []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={shader.uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleField;
