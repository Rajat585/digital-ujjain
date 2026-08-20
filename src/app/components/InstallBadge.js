"use client";
import { useState, useEffect } from "react";

function detectPlatform() {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isFirefox = /firefox/i.test(ua);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  return { isIOS, isSafari, isFirefox, isStandalone };
}

export default function InstallBadge() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!platform || platform.isStandalone) return null;

  async function handleClick() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return;
    }
    setShowTip((v) => !v);
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="flex items-center gap-1 border border-ujjain-gold/40 text-ujjain-gold px-3 py-1 rounded-full text-xs font-semibold hover:bg-ujjain-gold/10 transition"
      >
        📲 App
      </button>
      {showTip && (
        <div className="absolute right-0 top-10 w-56 bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-3 text-xs text-ujjain-cream/80 shadow-lg z-50">
                    {platform.isIOS && platform.isSafari ? (
            <>Share button (⬆️) dabao, phir "Add to Home Screen" chuno.</>
          ) : platform.isFirefox ? (
            <>Firefox desktop abhi install feature support nahi karta. Chrome ya Edge browser use karo, ya <kbd>Ctrl+D</kbd> dabaakar bookmark kar lo.</>
          ) : (
            <>Browser menu (⋮) kholo aur "Install" ya "Add to Home screen" chuno.</>
          )}
        </div>
      )}
    </div>
  );
}