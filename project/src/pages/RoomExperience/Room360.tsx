import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

type CameraControllerProps = {
  isUiHovered: boolean;
  viewState: 'default' | 'mirror' | 'board';
};

// Bounding limits ensuring the image NEVER goes out of the frame by more than 30% of the image.
// The panoramic cylinder arc is 130° (2.2689 rad).
// 30% of the image is 39° (0.68 rad).
// Clamping total yaw to ±0.42 rad (~24°) limits maximum shift to ~18.5%, well within the 30% limit.
const MAX_YAW = 0.42;
const MAX_PITCH = 0.08;
const MIN_FOV = 44;
const MAX_FOV = 68;

function CameraController({ isUiHovered, viewState }: CameraControllerProps) {
  const { camera, gl } = useThree();
  const targetRotation = useRef({ yaw: 0, pitch: 0 });
  const targetFov = useRef(64);
  const pointerNorm = useRef({ x: 0, y: 0 });
  const isInsideFrameRef = useRef(false);
  const dragOffset = useRef({ yaw: 0, pitch: 0 });

  // Handle specific view states (mirror, board, default)
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (viewState === 'mirror') {
      targetRotation.current = { yaw: isMobile ? 0.44 : 0.35, pitch: -0.01 };
      targetFov.current = 22;
    } else if (viewState === 'board') {
      targetRotation.current = { yaw: isMobile ? -0.3 : -0.1, pitch: 0.15 };
      targetFov.current = 18;
    } else if (viewState === 'default') {
      dragOffset.current = { yaw: 0, pitch: 0 };
      targetRotation.current = { yaw: 0, pitch: 0 };
      targetFov.current = isMobile ? 110 : 64;
    }
  }, [viewState]);

  // Handle zooming via wheel: ACTIVELY INSIDE THE FRAME ONLY
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If hovering UI overlays or not in default view, do not zoom
      if (isUiHovered || viewState !== 'default') return;

      const rect = gl.domElement.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      // Only zoom actively when cursor is inside the frame
      if (!isInside) return;

      e.preventDefault();
      const zoomAmount = e.deltaY * 0.04;
      targetFov.current = THREE.MathUtils.clamp(targetFov.current + zoomAmount, MIN_FOV, MAX_FOV);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isUiHovered, viewState, gl]);

  // Handle touch events (mobile / tablet gestures)
  useEffect(() => {
    let initialDistance = 0;
    let initialFov = 0;
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
        const zoomAmount = distanceDelta * 0.08;
        targetFov.current = THREE.MathUtils.clamp(initialFov + zoomAmount, MIN_FOV, MAX_FOV);
      } else if (e.touches.length === 1 && viewState === 'default') {
        const currentTouchX = e.touches[0].clientX;
        const currentTouchY = e.touches[0].clientY;

        const deltaX = currentTouchX - lastTouchX;
        const deltaY = currentTouchY - lastTouchY;
        const panSensitivity = 0.004;

        dragOffset.current.yaw = THREE.MathUtils.clamp(
          dragOffset.current.yaw + deltaX * panSensitivity,
          -MAX_YAW * 0.8,
          MAX_YAW * 0.8
        );
        dragOffset.current.pitch = THREE.MathUtils.clamp(
          dragOffset.current.pitch + deltaY * panSensitivity,
          -MAX_PITCH * 0.8,
          MAX_PITCH * 0.8
        );

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

  // Handle mouse movement and drag
  useEffect(() => {
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (isUiHovered || viewState !== 'default') return;

      const rect = gl.domElement.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) return;

      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideFrameRef.current = inside;

      if (isDragging && viewState === 'default') {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        const panSensitivity = 0.003;
        dragOffset.current.yaw = THREE.MathUtils.clamp(
          dragOffset.current.yaw + deltaX * panSensitivity,
          -MAX_YAW * 0.65,
          MAX_YAW * 0.65
        );
        dragOffset.current.pitch = THREE.MathUtils.clamp(
          dragOffset.current.pitch + deltaY * panSensitivity,
          -MAX_PITCH * 0.65,
          MAX_PITCH * 0.65
        );
      }

      if (inside) {
        // Inside the frame: normalized coordinate between -1.0 and +1.0
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        pointerNorm.current = {
          x: THREE.MathUtils.clamp(nx, -1, 1),
          y: THREE.MathUtils.clamp(ny, -1, 1),
        };
      } else {
        // Outside the frame: normalized relative to window
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        pointerNorm.current = {
          x: THREE.MathUtils.clamp(nx, -1, 1),
          y: THREE.MathUtils.clamp(ny, -1, 1),
        };
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isUiHovered, viewState, gl]);

  useFrame((state, delta) => {
    const isMobile = window.innerWidth <= 768;

    if (viewState === 'mirror') {
      const damping = 4.5;
      const euler = new THREE.Euler(targetRotation.current.pitch, targetRotation.current.yaw, 0, 'YXZ');
      const targetQuat = new THREE.Quaternion().setFromEuler(euler);
      camera.quaternion.slerp(targetQuat, delta * damping);

      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, delta * damping);
        camera.updateProjectionMatrix();
      }
      return;
    }

    if (viewState === 'board') {
      const damping = 4.0;
      const euler = new THREE.Euler(targetRotation.current.pitch, targetRotation.current.yaw, 0, 'YXZ');
      const targetQuat = new THREE.Quaternion().setFromEuler(euler);
      camera.quaternion.slerp(targetQuat, delta * damping);

      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, delta * damping);
        camera.updateProjectionMatrix();
      }
      return;
    }

    // Default room view state
    if (!isMobile) {
      const inside = isInsideFrameRef.current;

      let cursorYaw = 0;
      let cursorPitch = 0;
      let damping = 3.5;

      if (inside) {
        // Actively move left and right based on mouse movement inside the frame
        cursorYaw = -pointerNorm.current.x * 0.35;
        cursorPitch = pointerNorm.current.y * 0.05;
        damping = 4.0; // Responsive, active reaction
      } else {
        // Outside the frame: react to mouse movement but VERY SLOWLY
        cursorYaw = -pointerNorm.current.x * 0.10;
        cursorPitch = pointerNorm.current.y * 0.02;
        damping = 0.8; // Very slow, calm, gentle drift
      }

      // Combine drag + cursor tracking and clamp to strictly prevent going >30% out of frame
      const combinedYaw = THREE.MathUtils.clamp(
        dragOffset.current.yaw + cursorYaw,
        -MAX_YAW,
        MAX_YAW
      );
      const combinedPitch = THREE.MathUtils.clamp(
        dragOffset.current.pitch + cursorPitch,
        -MAX_PITCH,
        MAX_PITCH
      );

      targetRotation.current.yaw = combinedYaw;
      targetRotation.current.pitch = combinedPitch;

      // Smoothly interpolate camera rotation
      const euler = new THREE.Euler(targetRotation.current.pitch, targetRotation.current.yaw, 0, 'YXZ');
      const targetQuat = new THREE.Quaternion().setFromEuler(euler);
      camera.quaternion.slerp(targetQuat, delta * damping);

      // Smoothly interpolate camera FOV
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, delta * (inside ? 4.0 : 1.5));
        camera.updateProjectionMatrix();
      }
    }
  });

  return null;
}

function RoomGeometry({ mirrorTransitionPhase }: { mirrorTransitionPhase: string }) {
  const texture = useTexture('/images/updated room.png');
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

      {/* Curved panoramic canvas configured for updated room.png (2172x724 = 3.0:1 ratio) */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]} renderOrder={0}>
        {/* Arc length = 500 * (130 * PI / 180) = 1134.4. For 3.0 ratio, height = 1134.4 / 3 = 378 */}
        <cylinderGeometry args={[500, 500, 378, 64, 1, true, -13 * Math.PI / 36, 13 * Math.PI / 18]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>

      {/* Mirror overlay in 3D */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]} renderOrder={1}>
        <cylinderGeometry args={[500, 500, 378, 64, 1, true, -13 * Math.PI / 36, 13 * Math.PI / 18]} />
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

// Preload critical textures immediately so they load and render instantly
useTexture.preload('/images/updated room.png');
useTexture.preload('/images/Mirror.png');

export default function Room360({ isUiHovered, viewState, mirrorTransitionPhase = 'idle' }: Room360Props) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return (
    <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 0], fov: isMobile ? 110 : 64, near: 0.1, far: 1000 }}
        gl={{
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <React.Suspense fallback={null}>
          <RoomGeometry mirrorTransitionPhase={mirrorTransitionPhase} />
          <CameraController isUiHovered={isUiHovered} viewState={viewState} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
