import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

type CameraControllerProps = {
  isUiHovered: boolean;
  viewState: 'default' | 'mirror' | 'board';
};

function CameraController({ isUiHovered, viewState }: CameraControllerProps) {
  const { camera, gl } = useThree();
  const targetRotation = useRef({ yaw: 0, pitch: 0 }); // Initial target rotation
  const targetFov = useRef(75);
  const pointerPos = useRef({ x: 0, y: 0 });

  // Handle specific view states (like zooming to mirror)
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (viewState === 'mirror') {
      targetRotation.current = { yaw: isMobile ? 0.35 : 0.2, pitch: -0.05 };
      targetFov.current = 16;
    } else if (viewState === 'board') {
      targetRotation.current = { yaw: isMobile ? -0.3 : -0.1, pitch: 0.15 };
      targetFov.current = 18;
    } else if (viewState === 'default') {
      targetRotation.current = { yaw: 0, pitch: 0 };
      targetFov.current = isMobile ? 110 : 75;
    }
  }, [viewState]);

  // Handle zooming via wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If hovering UI, don't zoom
      if (isUiHovered || viewState === 'mirror') return;

      const zoomAmount = e.deltaY * 0.05;
      targetFov.current = THREE.MathUtils.clamp(targetFov.current + zoomAmount, 30, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isUiHovered]);

  // Handle zooming via pinch (touch events) and panning via single-finger drag
  useEffect(() => {
    let initialDistance = 0;
    let initialFov = 0;

    // For 1-finger panning
    let lastTouchX = 0;
    let lastTouchY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (isUiHovered || viewState === 'mirror') return;

      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialDistance = Math.sqrt(dx * dx + dy * dy);
        initialFov = targetFov.current;
      } else if (e.touches.length === 1) {
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isUiHovered || viewState === 'mirror') return;
      e.preventDefault();

      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);

        const distanceDelta = initialDistance - currentDistance;
        const zoomAmount = distanceDelta * 0.1;
        targetFov.current = THREE.MathUtils.clamp(initialFov + zoomAmount, 30, 100);
      } else if (e.touches.length === 1 && viewState === 'default') {
        const currentTouchX = e.touches[0].clientX;
        const currentTouchY = e.touches[0].clientY;

        const deltaX = currentTouchX - lastTouchX;
        const deltaY = currentTouchY - lastTouchY;

        // Adjust sensitivity for panning
        const panSensitivity = 0.005;

        targetRotation.current.yaw += deltaX * panSensitivity;
        targetRotation.current.pitch += deltaY * panSensitivity;

        // Clamp pitch to avoid flipping
        targetRotation.current.pitch = THREE.MathUtils.clamp(targetRotation.current.pitch, -Math.PI / 4, Math.PI / 4);

        lastTouchX = currentTouchX;
        lastTouchY = currentTouchY;
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isUiHovered, viewState]);

  // Handle pointer movement for panning
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalize pointer coordinates (-1 to 1)
      pointerPos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    // Only update targets if we are not hovering interactive UI elements and we are in default view (not frozen in mirror)
    const isMobile = window.innerWidth <= 768;
    if (!isUiHovered && viewState === 'default' && !isMobile) {
      // Calculate a deadzone for x and y
      const deadzone = 0.2;
      let moveX = 0;
      let moveY = 0;

      if (Math.abs(pointerPos.current.x) > deadzone) {
        moveX = pointerPos.current.x > 0 ? pointerPos.current.x - deadzone : pointerPos.current.x + deadzone;
      }

      if (Math.abs(pointerPos.current.y) > deadzone) {
        moveY = pointerPos.current.y > 0 ? pointerPos.current.y - deadzone : pointerPos.current.y + deadzone;
      }

      // Max rotation speed
      const sensitivity = 0.5;
      targetRotation.current.yaw -= moveX * sensitivity * delta;
      targetRotation.current.pitch += moveY * sensitivity * delta;

      // Clamp pitch to avoid looking completely up/down
      targetRotation.current.pitch = THREE.MathUtils.clamp(targetRotation.current.pitch, -Math.PI / 4, Math.PI / 4);
    }

    // Smoothly interpolate camera rotation
    const damping = viewState === 'mirror' ? 4.5 : 3.0; // Faster convergence for a quick, snappy zoom

    // Create Quaternions for smooth spherical interpolation
    const euler = new THREE.Euler(targetRotation.current.pitch, targetRotation.current.yaw, 0, 'YXZ');
    const targetQuat = new THREE.Quaternion().setFromEuler(euler);
    camera.quaternion.slerp(targetQuat, delta * damping);

    // Smoothly interpolate camera FOV
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, delta * damping);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

function RoomGeometry({ mirrorTransitionPhase }: { mirrorTransitionPhase: string }) {
  const texture = useTexture('/images/finalversion.png');
  const mirrorTexture = useTexture('/images/Mirror.png');

  // Improve texture quality
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  mirrorTexture.generateMipmaps = true;
  mirrorTexture.minFilter = THREE.LinearMipmapLinearFilter;
  mirrorTexture.magFilter = THREE.LinearFilter;
  mirrorTexture.colorSpace = THREE.SRGBColorSpace;

  const mirrorMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    if (mirrorMaterialRef.current) {
      const targetOpacity = mirrorTransitionPhase === 'idle' ? 0 : 1;
      // Damping 3.5 gives a smooth ~1s transition
      mirrorMaterialRef.current.opacity = THREE.MathUtils.lerp(
        mirrorMaterialRef.current.opacity, 
        targetOpacity, 
        delta * 3.5
      );
    }
  });

  // The provided image is a standard flat 2D image (approx 16:9), not a 2:1 equirectangular panorama.
  // Mapping a flat image to a Sphere causes severe distortion (bowed lines, stretched poles).
  // To preserve the interaction system (yaw/pitch camera) but render the image without distortion,
  // we place it on a large curved Cylinder segment (or flat Plane) in front of the camera.
  // When a proper 2:1 equirectangular image is provided later, this can be swapped back to a <Sphere>.

  // Cylinder args: [radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]
  // We use a cylinder to keep the distance to the camera constant as it pans horizontally.
  return (
    <group>
      {/* 
        Uncomment this Sphere when a mathematically correct 2:1 equirectangular panorama is provided:
        <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]} rotation={[0, -Math.PI / 2, 0]}>
          <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </Sphere>
      */}

      {/* Temporary curved canvas for the flat image to prevent distortion */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]} renderOrder={0}>
        {/* Arc length = 500 * (Math.PI/2) = 785. For 16:9 ratio, height = 785 / (16/9) = 441.5 */}
        <cylinderGeometry args={[500, 500, 441.5, 64, 1, true, -Math.PI / 4, Math.PI / 2]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>

      {/* Mirror overlay in 3D */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]} renderOrder={1}>
        <cylinderGeometry args={[500, 500, 441.5, 64, 1, true, -Math.PI / 4, Math.PI / 2]} />
        <meshBasicMaterial 
          ref={mirrorMaterialRef} 
          map={mirrorTexture} 
          side={THREE.BackSide} 
          transparent={true} 
          opacity={0} 
          depthTest={false}
        />
      </mesh>
    </group>
  );
}

// Reusable Hotspot component for future architecture
export type HotspotProps = {
  id: string;
  yaw: number;
  pitch: number;
  title: string;
  onClick: () => void;
};

export function Hotspot({ id, yaw, pitch, title, onClick }: HotspotProps) {
  // Convert spherical (yaw, pitch) to Cartesian coordinates (x,y,z) on the sphere
  const radius = 400;
  const phi = Math.PI / 2 - pitch; // Colatitude
  const theta = yaw; // Longitude

  const x = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);

  return (
    <Html position={[x, y, z]} center zIndexRange={[100, 0]}>
      <button className="hotspot-button" onClick={onClick} aria-label={title}>
        <div className="hotspot-dot" />
        <span className="hotspot-title">{title}</span>
      </button>
    </Html>
  );
}


type Room360Props = {
  isUiHovered: boolean;
  viewState: 'default' | 'mirror' | 'board';
  mirrorTransitionPhase?: 'idle' | 'transitioning' | 'finished';
};

export default function Room360({ isUiHovered, viewState, mirrorTransitionPhase = 'idle' }: Room360Props) {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 1000 }}>
        <React.Suspense fallback={null}>
          <RoomGeometry mirrorTransitionPhase={mirrorTransitionPhase} />
          <CameraController isUiHovered={isUiHovered} viewState={viewState} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
