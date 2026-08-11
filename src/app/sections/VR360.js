"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useLanguage } from "../components/LanguageContext";

function SkyDome() {
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 32, 32]} />
      <meshBasicMaterial color="#1a1a2e" side={2} />
    </mesh>
  );
}

function GhatScene() {
  const templeRef = useRef();

  useFrame((state, delta) => {
    if (templeRef.current) {
      templeRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      <SkyDome />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <circleGeometry args={[15, 32]} />
        <meshStandardMaterial color="#2d2440" />
      </mesh>

      <group ref={templeRef} position={[0, -1, -5]}>
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2, 3, 2]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 3, 0]}>
          <coneGeometry args={[1.5, 2, 4]} />
          <meshStandardMaterial color="#FF9933" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>

      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 10;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, -1, Math.sin(angle) * radius]}>
            <cylinderGeometry args={[0.3, 0.3, 4, 8]} />
            <meshStandardMaterial color="#800000" metalness={0.3} roughness={0.6} />
          </mesh>
        );
      })}

      <ambientLight intensity={0.6} />
      <pointLight position={[0, 5, -5]} intensity={1.5} color="#FFD700" />
      <pointLight position={[5, 3, 5]} intensity={0.8} color="#FF9933" />
    </group>
  );
}

const text = {
  hi: {
    title: "360° Ghat Experience",
    subtitle: "Drag karke chaaron taraf dekho",
  },
  en: {
    title: "360° Ghat Experience",
    subtitle: "Drag to look all around",
  },
};

export default function VR360() {
  const { lang } = useLanguage();
  const t = text[lang];

  return (
    <section className="h-screen w-full bg-ujjain-dark relative overflow-hidden">
      <div className="absolute top-10 left-0 right-0 text-center z-10 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-bold text-ujjain-gold">{t.title}</h2>
        <p className="text-ujjain-cream mt-2">{t.subtitle}</p>
      </div>

      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <GhatScene />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={-0.5} />
      </Canvas>
    </section>
  );
}