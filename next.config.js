/** @type {import('next').NextConfig} */

var path = require("path");
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/app")],
  },
};

module.exports = nextConfig;
