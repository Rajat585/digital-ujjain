"use client";
import dynamic from "next/dynamic";

// Heavy WebGL (three.js) sections and the chatbot are loaded client-side
// only, on demand. `dynamic(..., { ssr: false })` requires a Client
// Component boundary in Next.js App Router, which is why these live here
// instead of directly inside the (server) page.js.

export const Gateway3D = dynamic(() => import("../sections/Gateway3D"), {
  loading: () => (
    <div className="h-screen flex items-center justify-center text-ujjain-gold/50 text-sm">
      Loading gateway…
    </div>
  ),
});



// The chatbot's knowledge base is large (700+ lines) and not needed for the
// very first paint — load it after the shell mounts instead of blocking it.
export const MahakalMitra = dynamic(() => import("./MahakalMitra"), { ssr: false });