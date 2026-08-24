"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";
import { useLanguage } from "../components/LanguageContext";

// ---------------------------------------------------------------------------
// Waypoints — camera position + look-at target for each landmark.
// Reuses the same landmark names as SimhasthaZone.js for consistency.
// ---------------------------------------------------------------------------
const waypoints = [
  {
    id: "ramghat",
    nameHi: "Ram Ghat",
    nameEn: "Ram Ghat",
    icon: "🛕",
    camPos: [0, 1.6, 9],
    lookAt: [0, 0, 0],
  },
  {
    id: "mahakal",
    nameHi: "Mahakaleshwar Mandir",
    nameEn: "Mahakaleshwar Temple",
    icon: "🙏",
    camPos: [-9, 2.5, -3],
    lookAt: [-11, 4, -8],
  },
  {
    id: "corridor",
    nameHi: "Mahakal Lok Corridor",
    nameEn: "Mahakal Lok Corridor",
    icon: "🏛️",
    camPos: [7, 2, -2],
    lookAt: [11, 1.5, -6],
  },
  {
    id: "kalbhairav",
    nameHi: "Kal Bhairav Ghat",
    nameEn: "Kal Bhairav Ghat",
    icon: "🌊",
    camPos: [3, 1.4, 6],
    lookAt: [8, 0.5, 10],
  },
];

const text = {
  hi: {
    title: "360° सिंहस्थ वॉकथ्रू",
    subtitle: "नीचे बटन दबाएं, घुमाएं और खुद देखें",
  },
  en: {
    title: "360° Simhastha Walkthrough",
    subtitle: "Tap a spot below, then drag to look around",
  },
  hinglish: {
    title: "360° Simhastha Walkthrough",
    subtitle: "Neeche button dabao, ghumo aur khud dekho",
  },
};

// ---------------------------------------------------------------------------
// Sky dome
// ---------------------------------------------------------------------------
function SkyDome() {
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[60, 32, 32]} />
      <meshBasicMaterial color="#1a1a2e" side={THREE.BackSide} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Animated river — a plane whose vertices ripple over time (no textures)
// ---------------------------------------------------------------------------
function River() {
  const geo = useMemo(() => new THREE.PlaneGeometry(30, 8, 60, 16), []);
  const base = useMemo(() => {
    const arr = new Float32Array(geo.attributes.position.array.length);
    arr.set(geo.attributes.position.array);
    return arr;
  }, [geo]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pos = geo.attributes.position;
    const arr = pos.array;
    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const x = base[ix];
      const y = base[ix + 1];
      arr[ix + 2] = Math.sin(x * 0.4 + t * 1.2) * 0.08 + Math.cos(y * 0.6 + t * 0.8) * 0.06;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 4]}>
      <meshStandardMaterial
        color="#2b4d6b"
        metalness={0.6}
        roughness={0.25}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Ghat steps (Ram Ghat) with a row of flickering diyas
// ---------------------------------------------------------------------------
function GhatSteps() {
  const steps = 5;
  return (
    <group position={[0, -0.3, -1]}>
      {[...Array(steps)].map((_, i) => (
        <mesh key={i} position={[0, -i * 0.35, i * 0.9]}>
          <boxGeometry args={[8 - i * 0.3, 0.3, 1]} />
          <meshStandardMaterial color="#c9a876" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Diyas() {
  const groupRef = useRef();
  const count = 14;
  const flick = useRef(new Float32Array(count).map(() => Math.random() * Math.PI * 2));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.children.forEach((diya, i) => {
      const s = 0.9 + Math.sin(t * 4 + flick.current[i]) * 0.25;
      diya.scale.setScalar(s);
    });
  });

  const positions = useMemo(() => {
    return [...Array(count)].map((_, i) => {
      const x = -6 + (i / (count - 1)) * 12;
      return [x, 0.05, 2.6];
    });
  }, []);

  return (
    <group ref={groupRef}>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#ffb347" emissive="#ff8c00" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Detailed tiered temple (Mahakaleshwar-style shikhara)
// ---------------------------------------------------------------------------
function Temple({ position = [-11, 0, -8] }) {
  const tiers = 4;
  return (
    <group position={position}>
      {/* base plinth */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[4, 0.6, 4]} />
        <meshStandardMaterial color="#8a6d3b" roughness={0.8} />
      </mesh>
      {/* main sanctum */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[2.6, 2.4, 2.6]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* stacked shikhara tiers, shrinking upward */}
      {[...Array(tiers)].map((_, i) => {
        const scale = 1 - i * 0.18;
        const y = 3 + i * 1.1;
        return (
          <mesh key={i} position={[0, y, 0]}>
            <coneGeometry args={[1.3 * scale, 1.3, 4]} />
            <meshStandardMaterial color="#FF9933" metalness={0.55} roughness={0.35} />
          </mesh>
        );
      })}
      {/* golden finial */}
      <mesh position={[0, 3 + tiers * 1.1 + 0.3, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.4}
        />
      </mesh>
      <pointLight position={[0, 3, 2]} intensity={1.2} color="#FFD700" distance={12} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Mahakal Lok Corridor — a row of pillars/statues forming a walkway
// ---------------------------------------------------------------------------
function Corridor({ position = [11, 0, -6] }) {
  const pillarCount = 6;
  return (
    <group position={position}>
      {[...Array(pillarCount)].map((_, i) => {
        const z = -i * 1.8;
        return (
          <group key={i}>
            <mesh position={[-1.4, 1.2, z]}>
              <cylinderGeometry args={[0.18, 0.22, 2.4, 8]} />
              <meshStandardMaterial color="#c9a876" roughness={0.7} />
            </mesh>
            <mesh position={[1.4, 1.2, z]}>
              <cylinderGeometry args={[0.18, 0.22, 2.4, 8]} />
              <meshStandardMaterial color="#c9a876" roughness={0.7} />
            </mesh>
            <mesh position={[0, 1.4, z]}>
              <coneGeometry args={[0.35, 0.6, 4]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.5} roughness={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Kal Bhairav Ghat — a small shrine + steps on the far bank
// ---------------------------------------------------------------------------
function KalBhairavGhat({ position = [8, 0, 10] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[1.6, 1.8, 1.6]} />
        <meshStandardMaterial color="#800000" roughness={0.6} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <coneGeometry args={[1, 1.2, 4]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.5} roughness={0.4} />
      </mesh>
      <pointLight position={[0, 2, 1.5]} intensity={0.8} color="#FF9933" distance={8} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Ground
// ---------------------------------------------------------------------------
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
      <circleGeometry args={[30, 48]} />
      <meshStandardMaterial color="#2d2440" />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// Camera rig — smoothly flies to the active waypoint, then hands control
// back to OrbitControls for free-look until the next waypoint is chosen.
// ---------------------------------------------------------------------------
function CameraRig({ target, controlsRef }) {
  useFrame((state, delta) => {
    const lerpFactor = 1 - Math.pow(0.001, delta);
    state.camera.position.lerp(new THREE.Vector3(...target.camPos), lerpFactor);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(new THREE.Vector3(...target.lookAt), lerpFactor);
      controlsRef.current.update();
    }
  });
  return null;
}

function Scene({ activeWaypoint, controlsRef }) {
  return (
    <>
      <SkyDome />
      <Ground />
      <River />
      <GhatSteps />
      <Diyas />
      <Temple />
      <Corridor />
      <KalBhairavGhat />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#4a3d6b", "#1a1a2e", 0.4]} />

      <CameraRig target={activeWaypoint} controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        minDistance={2}
        maxDistance={20}
        rotateSpeed={-0.5}
      />
    </>
  );
}

export default function VR360() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [activeId, setActiveId] = useState(waypoints[0].id);
  const [dpr, setDpr] = useState(1.5);
  const controlsRef = useRef();

  const activeWaypoint = waypoints.find((w) => w.id === activeId);

  return (
    <section id="vr-zone" className="h-screen w-full bg-ujjain-dark relative overflow-hidden">
      <div className="absolute top-10 left-0 right-0 text-center z-10 pointer-events-none px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-ujjain-gold">{t.title}</h2>
        <p className="text-ujjain-cream mt-2">{t.subtitle}</p>
      </div>

      <Canvas
        dpr={dpr}
        camera={{ position: waypoints[0].camPos, fov: 60 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1.5 : 1.5))}
        />
        <Suspense fallback={null}>
          <Scene activeWaypoint={activeWaypoint} controlsRef={controlsRef} />
        </Suspense>
      </Canvas>

      {/* Waypoint navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-wrap justify-center gap-2 px-4">
        {waypoints.map((w) => (
          <button
            key={w.id}
            onClick={() => setActiveId(w.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${activeId === w.id
              ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold"
              : "bg-black/40 text-ujjain-cream border-ujjain-gold/40 hover:border-ujjain-gold"
              }`}
          >
            <span className="mr-1">{w.icon}</span>
            {lang !== "en" ? w.nameHi : w.nameEn}
          </button>
        ))}
      </div>
    </section>
  );
}