import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const OutfitVisualizer = ({ outfitParams }) => {
  const materialRef = useRef(null);

  const { primaryColor = '#0A0A0B', secondaryColor = '#C9A84C', roughness = 0.3, metalness = 0.1 } = outfitParams || {};

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(primaryColor),
      roughness,
      metalness,
      transparent: true
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uThreshold = { value: 0 };
      shader.uniforms.uSecondaryColor = { value: new THREE.Color(secondaryColor) };
      shader.uniforms.uTime = { value: 0 };

      shader.vertexShader = `
        varying vec2 vUv;
        varying vec3 vPos;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         vUv = uv;
         vPos = position;`
      );

      shader.fragmentShader = `
        uniform float uThreshold;
        uniform vec3 uSecondaryColor;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vPos;

        float hash(vec3 p) {
          p = fract(p * 0.3183099 + vec3(0.1));
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
          );
        }
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <color_fragment>',
        `#include <color_fragment>
         diffuseColor.rgb = mix(diffuseColor.rgb, uSecondaryColor, vUv.y);`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <output_fragment>',
        `
          float n = noise(vec3(vUv * 8.0, vPos.y * 3.0 + uTime * 0.2));
          if (n > uThreshold) discard;
          float edgeWidth = 0.08;
          float edge = smoothstep(uThreshold, uThreshold - edgeWidth, n);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(2.5, 2.0, 1.0), edge * 0.6);
        #include <output_fragment>
        `
      );

      mat.userData.shader = shader;
    };

    return mat;
  }, []);

  useEffect(() => {
    if (!material) return;
    material.color = new THREE.Color(primaryColor);
    material.roughness = roughness;
    material.metalness = metalness;
    material.needsUpdate = true;
    materialRef.current = material;

    if (material.userData?.shader) {
      material.userData.shader.uniforms.uSecondaryColor.value = new THREE.Color(secondaryColor);
    }

    let startTime = null;
    const duration = 1500;

    const animateDissolve = (now) => {
      if (!material?.userData?.shader) return;
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const circOut = Math.sqrt(1.0 - Math.pow(progress - 1.0, 2.0));
      material.userData.shader.uniforms.uThreshold.value = circOut;
      if (progress < 1) requestAnimationFrame(animateDissolve);
    };

    requestAnimationFrame(animateDissolve);
  }, [primaryColor, secondaryColor, roughness, metalness]);

  useFrame((state) => {
    if (material?.userData?.shader) {
      material.userData.shader.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      <mesh position={[0, 0.72, 0.02]} material={material}>
        <capsuleGeometry args={[0.33, 0.58, 8, 20]} />
      </mesh>
      <mesh position={[-0.2, -0.28, 0.05]} material={material}>
        <boxGeometry args={[0.15, 0.22, 0.24]} />
      </mesh>
      <mesh position={[0.2, -0.28, 0.05]} material={material}>
        <boxGeometry args={[0.15, 0.22, 0.24]} />
      </mesh>
    </group>
  );
};

export default OutfitVisualizer;
