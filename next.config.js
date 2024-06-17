/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, crypto: false };
    return config;
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
});

module.exports = withPWA({
  ...nextConfig,
});

//module.exports = nextConfig;
