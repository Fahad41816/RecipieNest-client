/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
const nextConfig = { 
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  };

module.exports = nextConfig
