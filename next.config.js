/** @type {import('next').NextConfig} */

var path = require("path");
const withPWA = require("next-pwa")({
  dest: "public",
});
const nextConfig = withPWA({
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/app")],
  },
});

module.exports = nextConfig;
