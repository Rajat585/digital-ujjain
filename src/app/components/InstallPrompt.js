"use client";
import { useState, useEffect } from "react";

function detectPlatform() {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isFirefox = /firefox/i.test(ua);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone;
  return { isIOS, isSafari, isFirefox, isStandalone };
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);

    if (p.isStandalone) return; // already installed, don't show anything

    const dismissed = sessionStorage.getItem("du_install_dismissed");
    if (dismissed) return;

    // iOS Safari never fires beforeinstallprompt — show manual instructions instead
    if (p.isIOS && p.isSafari) {
      setShowBanner(true);
      return;
    }

    // Firefox never fires beforeinstallprompt either — show manual instructions instead
    if (p.isFirefox) {
      setShowBanner(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
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

  if (!showBanner || !platform) return null;

  // iOS Safari — manual instructions (no native prompt exists on iOS)
  if (platform.isIOS && platform.isSafari) {
    return (
      <div className="fixed bottom-40 left-4 right-4 md:bottom-4 md:left-auto md:right-4 md:w-80 bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-4 shadow-lg z-50 flex items-start gap-3">
        <span className="text-3xl">📲</span>
        <div className="flex-1">
          <p className="text-ujjain-cream text-sm font-semibold">
            Digital Ujjain install karo
          </p>
          <p className="text-ujjain-cream/60 text-xs mt-1">
            Neeche <strong>Share</strong> button (⬆️) dabao, phir{" "}
            <strong>"Add to Home Screen"</strong> chuno.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-ujjain-cream/50 text-xs shrink-0"
        >
          ✕
        </button>
      </div>
    );
  }

  // Firefox — no beforeinstallprompt support, show manual hint
  if (platform.isFirefox) {
    return (
      <div className="fixed bottom-40 left-4 right-4 md:bottom-4 md:left-auto md:right-4 md:w-80 bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-4 shadow-lg z-50 flex items-start gap-3">
        <span className="text-3xl">📲</span>
        <div className="flex-1">
          <p className="text-ujjain-cream text-sm font-semibold">
            Digital Ujjain install karo
          </p>
          <p className="text-ujjain-cream/60 text-xs mt-1">
            Firefox desktop abhi install feature support nahi karta. Chrome ya
            Edge browser use karo, ya <kbd>Ctrl+D</kbd> dabaakar bookmark kar
            lo.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-ujjain-cream/50 text-xs shrink-0"
        >
          ✕
        </button>
      </div>
    );
  }

  // Chrome/Edge and other Chromium browsers — native install prompt
  return (
    <div className="fixed bottom-40 left-4 right-4 md:bottom-4 md:left-auto md:right-4 md:w-80 bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-4 shadow-lg z-50 flex items-center gap-3">
      <span className="text-3xl">📲</span>
      <div className="flex-1">
        <p className="text-ujjain-cream text-sm font-semibold">
          Digital Ujjain install karo
        </p>
        <p className="text-ujjain-cream/60 text-xs">
          Home screen se seedha kholo, offline bhi kaam karega
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <button
          onClick={handleInstall}
          className="bg-ujjain-gold text-ujjain-dark text-xs font-semibold px-3 py-1.5 rounded-lg"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="text-ujjain-cream/50 text-xs"
        >
          Nahi chahiye
        </button>
      </div>
    </div>
  );
}