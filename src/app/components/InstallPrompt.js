"use client";
import { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = sessionStorage.getItem("du_install_dismissed");
      if (!dismissed) setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowBanner(false);
  }

  function handleDismiss() {
    sessionStorage.setItem("du_install_dismissed", "1");
    setShowBanner(false);
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-4 shadow-lg z-50 flex items-center gap-3">
      <span className="text-3xl">📲</span>
      <div className="flex-1">
        <p className="text-ujjain-cream text-sm font-semibold">Digital Ujjain install karo</p>
        <p className="text-ujjain-cream/60 text-xs">Home screen se seedha kholo, offline bhi kaam karega</p>
      </div>
      <div className="flex flex-col gap-1">
        <button onClick={handleInstall} className="bg-ujjain-gold text-ujjain-dark text-xs font-semibold px-3 py-1.5 rounded-lg">
          Install
        </button>
        <button onClick={handleDismiss} className="text-ujjain-cream/50 text-xs">
          Nahi chahiye
        </button>
      </div>
    </div>
  );
}