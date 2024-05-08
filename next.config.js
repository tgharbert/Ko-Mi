const path = require("path");
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  output: "standalone",
  webpack: (config, { isServer }) => {
    // for path in tsconfig.js: "@/*": ["./src/*"]
    config.resolve.alias["@"] = path.join(__dirname, "");
    return config;
  },
});
