import React, { Suspense, Component, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction, Effect } from 'postprocessing';
import * as THREE from 'three';
import ParticleField from './ParticleField.jsx';
import FloatingFabrics from './FloatingFabrics.jsx';
import HolographicRing from './HolographicRing.jsx';
import AvatarModel from './AvatarModel.jsx';
import OutfitVisualizer from './OutfitVisualizer.jsx';

/**
 * 1. WebGL/Canvas Fallback rendering if graphics hardware acceleration is disabled
 */
const LuxuryWebGLFallback = ({ error }) => {
  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle, var(--color-violet) 0%, var(--color-void) 100%)',
        padding: '30px',
        textAlign: 'center',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1
      }}
    >
      <div 
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '1.5px dashed var(--color-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          animation: 'slowOrbit 8s infinite linear',
          boxShadow: 'var(--shadow-gold)'
        }}
      >
        <span style={{ fontSize: '2.5rem' }}>*</span>
      </div>
      
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-gold)', marginBottom: '10px' }}>
        AURA Holographic Terminal
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-muted)', maxWidth: '350px' }}>
        Your device initialized in Stealth Mode. Standard WebGL filters were suspended, but style predictions and consultations remain fully operational.
      </p>
    </div>
  );
};

/**
 * 2. React ErrorBoundary wrapper catching internal R3F / Three.js exceptions
 */
class CanvasErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[AURA Canvas Boundary Caught]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <LuxuryWebGLFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

/**
 * 3. Primary FashionCanvas Component
 */
export const FashionCanvas = ({ 
  isScanning = false, 
  colorScheme = '#C9A84C', 
  activeOutfit = [], 
  showFabrics = true,
  shaderParams = null
}) => {
  // Translate activeOutfit to shader parameter objects
  const hasOutfit = activeOutfit && activeOutfit.length > 0;
  
  const outfitParams = React.useMemo(() => {
    if (shaderParams) {
      return {
        primaryColor: shaderParams.primaryColor || '#0A0A0B',
        secondaryColor: shaderParams.secondaryColor || '#C9A84C',
        roughness: shaderParams.roughness ?? 0.3,
        metalness: shaderParams.metalness ?? 0.1
      };
    }
    if (!hasOutfit) return null;
    
    // Sort items by outerwear/tops
    const outerwear = activeOutfit.find(i => i.category === 'Outerwear');
    const tops = activeOutfit.find(i => i.category === 'Tops');

    return {
      primaryColor: outerwear?.color || '#0A0A0B',
      secondaryColor: tops?.color || '#C9A84C',
      roughness: outerwear?.name.toLowerCase().includes('velvet') ? 0.5 : 0.25,
      metalness: tops?.name.toLowerCase().includes('gold') ? 0.8 : 0.15
    };
  }, [activeOutfit, hasOutfit, shaderParams]);

  const GrainEffectImpl = useMemo(() => {
    const fragmentShader = `
      uniform float opacity;
      void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        float noise = fract(sin(dot(uv * vec2(12.9898, 78.233), vec2(12.9898, 78.233))) * 43758.5453);
        vec3 color = inputColor.rgb + (noise - 0.5) * opacity;
        outputColor = vec4(color, inputColor.a);
      }
    `;
    return class extends Effect {
      constructor() {
        super('GrainEffect', fragmentShader, {
          blendFunction: BlendFunction.SCREEN,
          uniforms: new Map([['opacity', new THREE.Uniform(0.06)]])
        });
      }
    };
  }, []);

  const Grain = () => {
    const effect = useMemo(() => new GrainEffectImpl(), []);
    return <primitive object={effect} dispose={null} />;
  };

  return (
    <CanvasErrorBoundary>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 45 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
          style={{ width: '100%', height: '100%' }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.0;
          }}
        >
          {/* Base Ambient lights */}
          <ambientLight intensity={0.4} color="#16161D" />

          {/* Golden spotlights hitting mannequin face/torso */}
          <spotLight
            position={[5, 8, 5]}
            angle={0.3}
            penumbra={0.8}
            intensity={1.8}
            color="#E8C96A" // Warm Gold highlights
            castShadow
          />

          {/* Rim light (Violet cool ambiance behind avatar) */}
          <pointLight position={[-4, -3, -3]} intensity={1.5} color="#1A0A2E" />
          
          {/* Specular front soft filling light */}
          <directionalLight position={[0, 2, 4]} intensity={0.6} color="#F5F0E8" />

          <Suspense fallback={null}>
            {/* Drifting Gold Dust particles */}
            <ParticleField count={3000} />

            {/* Zero-gravity ribbon simulations */}
            {showFabrics && <FloatingFabrics />}

            {/* Circular rings around the avatar core */}
            <HolographicRing radius={1.4} color={colorScheme} />

            {/* Holographic scanner mannequin avatar */}
            <AvatarModel isScanning={isScanning} colorScheme={colorScheme} />

            {/* Materializing outfit overlay layers */}
            {hasOutfit && outfitParams && (
              <OutfitVisualizer outfitParams={outfitParams} />
            )}

            {/* Subtle orbital controls */}
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              autoRotate={!isScanning} // Pause rotation while scan laser is sweeping
              autoRotateSpeed={0.3}
              maxDistance={5.5}
              minDistance={1.8}
              maxPolarAngle={Math.PI / 1.8} // Restrict viewing bottom angles
              minPolarAngle={Math.PI / 3.0} // Restrict viewing top angles
            />

            <EffectComposer>
              <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
              <ChromaticAberration offset={[0.0015, 0.001]} />
              <Vignette eskil={false} offset={0.2} darkness={0.8} />
              <Grain />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
};

export default FashionCanvas;
