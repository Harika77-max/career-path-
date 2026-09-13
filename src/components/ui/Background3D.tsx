import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface Background3DProps {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const Background3D: React.FC<Background3DProps> = ({
  children,
  className,
  contentClassName,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ─── 1. Scene & Camera Setup ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e1a, 0.015);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 12, 45);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x070913, 1);

    const canvas = renderer.domElement;
    canvas.className = 'fixed inset-0 w-full h-full pointer-events-none z-0';
    container.appendChild(canvas);

    // ─── 2. 3D Undulating Horizon Grid (Terrain Mesh) ───
    const planeWidth = 140;
    const planeHeight = 140;
    const gridSegX = 65;
    const gridSegY = 65;

    const gridGeometry = new THREE.PlaneGeometry(
      planeWidth,
      planeHeight,
      gridSegX,
      gridSegY
    );
    gridGeometry.rotateX(-Math.PI / 2.3);
    gridGeometry.translate(0, -10, -10);

    // Save initial positions for organic wave calculations
    const posAttribute = gridGeometry.attributes.position;
    const originalPositions = new Float32Array(posAttribute.array.length);
    originalPositions.set(posAttribute.array);

    // Wireframe Material with Glowing Cyan / Blue tint
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    scene.add(gridMesh);

    // ─── 3. Floating 3D Grid Nodes (Points at Vertices) ───
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.45,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const gridPoints = new THREE.Points(gridGeometry, pointsMaterial);
    scene.add(gridPoints);

    // ─── 4. Floating 3D Celestial Particles / Data Constellation ───
    const particleCount = 280;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(particleCount * 3);
    const starVelocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      starPositions[idx] = (Math.random() - 0.5) * 110;
      starPositions[idx + 1] = Math.random() * 50 - 5;
      starPositions[idx + 2] = (Math.random() - 0.5) * 100;
      starVelocities.push((Math.random() - 0.5) * 0.03, Math.random() * 0.02 + 0.01);
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.65,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // ─── 5. Ambient Lighting and Glow Spheres in 3D Space ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const bluePointLight = new THREE.PointLight(0x3b82f6, 2.5, 90);
    bluePointLight.position.set(0, 20, 20);
    scene.add(bluePointLight);

    // ─── 6. Click Ripples Array ───
    interface ClickRipple {
      x: number;
      z: number;
      radius: number;
      maxRadius: number;
      strength: number;
    }
    const ripples: ClickRipple[] = [];

    // ─── 7. Event Handlers ───
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 14;
      mouseRef.current.targetY = ny * 7;
    };

    const handleClick = (e: MouseEvent) => {
      // Raycast to find click intersection on grid plane or approximate
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      ripples.push({
        x: nx * 35,
        z: 10,
        radius: 0,
        maxRadius: 40,
        strength: 3.5,
      });
      if (ripples.length > 5) ripples.shift();
    };

    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // ─── 8. Animation Loop ───
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Camera Parallax Response
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      camera.position.x = mouseRef.current.x;
      camera.position.y = 12 + mouseRef.current.y;
      camera.lookAt(0, 0, 0);

      // Undulate Terrain Mesh Vertices
      const pos = gridGeometry.attributes.position;
      const arr = pos.array as Float32Array;

      // Update ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 0.8;
        rip.strength *= 0.96;
        if (rip.radius > rip.maxRadius || rip.strength < 0.05) {
          ripples.splice(r, 1);
        }
      }

      for (let i = 0; i < arr.length; i += 3) {
        const origX = originalPositions[i];
        const origY = originalPositions[i + 1];
        const origZ = originalPositions[i + 2];

        // Organic waves in 3D
        let waveY =
          Math.sin(origX * 0.08 + elapsedTime * 1.4) * 1.8 +
          Math.cos(origZ * 0.07 + elapsedTime * 1.1) * 1.5;

        // Influence from mouse
        const distToMouse = Math.hypot(origX - mouseRef.current.x * 2.5, origZ);
        if (distToMouse < 25) {
          const repel = (1 - distToMouse / 25) * 2.2;
          waveY += Math.sin(elapsedTime * 3) * repel;
        }

        // Influence from click ripples
        for (const rip of ripples) {
          const distToRip = Math.hypot(origX - rip.x, origZ - rip.z);
          const diff = Math.abs(distToRip - rip.radius);
          if (diff < 6) {
            waveY += Math.sin(diff * 0.8) * rip.strength;
          }
        }

        arr[i + 1] = origY + waveY;
      }
      pos.needsUpdate = true;

      // Slowly rotate and drift the star field
      const starArr = starGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        starArr[idx + 1] += starVelocities[i * 2 + 1];
        if (starArr[idx + 1] > 45) {
          starArr[idx + 1] = -5;
        }
      }
      starGeometry.attributes.position.needsUpdate = true;
      starField.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // ─── 9. Cleanup ───
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      gridGeometry.dispose();
      gridMaterial.dispose();
      pointsMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();

      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={cn('relative w-full min-h-screen overflow-x-hidden bg-[#070913]', className)}
    >
      <div className={cn('relative z-10 w-full h-full min-h-screen', contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default Background3D;
