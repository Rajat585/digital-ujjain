import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageContext";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import InstallPrompt from "./components/InstallPrompt";

export const metadata = {
  metadataBase: new URL("https://digital-ujjain.vercel.app"),
  title: "Digital Ujjain — Mahakal Ki Nagri",
  description:
    "Ujjain ka digital pratibimb — itihaas, vikas, aur Simhastha 2028 ki jhalak, ek immersive digital yatra ke roop mein.",
  manifest: "/manifest.json",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛕</text></svg>",
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    title: "Digital Ujjain — Mahakal Ki Nagri",
    description:
      "Ujjain ka digital pratibimb — itihaas, vikas, aur Simhastha 2028 ki jhalak, ek immersive digital yatra ke roop mein.",
    url: "https://digital-ujjain.vercel.app",
    siteName: "Digital Ujjain",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "Digital Ujjain",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Ujjain — Mahakal Ki Nagri",
    description:
      "Ujjain ka digital pratibimb — itihaas, vikas, aur Simhastha 2028 ki jhalak, ek immersive digital yatra ke roop mein.",
    images: ["/icons/icon-512.png"],
  },
};

export const viewport = {
  themeColor: "#0a0a0f",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Razorpay Checkout widget script — loaded once, used by Hotel & Sathi booking */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <ServiceWorkerRegister />
        <InstallPrompt />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
