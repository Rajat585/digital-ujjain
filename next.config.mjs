/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.15', '192.168.29.123', '192.168.*.* '],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        pathname: "/wiki/Special:FilePath/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;