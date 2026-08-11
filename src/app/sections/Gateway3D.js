"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Gate() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Left Pillar */}
      <mesh position={[-2.2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 4, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[2.2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 4, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Top Beam */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[5, 0.4, 0.4]} />
        <meshStandardMaterial color="#FF9933" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Second Beam (thoda upar, temple gate wala look) */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[5.6, 0.3, 0.3]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Top decorative center piece */}
      <mesh position={[0, 3.1, 0]}>
        <coneGeometry args={[0.4, 0.6, 4]} />
        <meshStandardMaterial color="#FF9933" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function Gateway3D() {
  return (
    <section className="h-screen w-full bg-ujjain-dark relative overflow-hidden">
      <div className="absolute top-10 left-0 right-0 text-center z-10 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-bold text-ujjain-gold">
          Mahamrityunjay Dwar
        </h2>
        <p className="text-ujjain-cream mt-2">Ghumao aur dekho — 360°</p>
      </div>

      <Canvas camera={{ position: [0, 1, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#FFD700" />
        <pointLight position={[-5, 3, -5]} intensity={0.6} color="#FF9933" />

        <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
          <Gate />
        </Float>

        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </section>
  );
}