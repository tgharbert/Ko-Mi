const path = require("path");

module.exports = {
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
};
