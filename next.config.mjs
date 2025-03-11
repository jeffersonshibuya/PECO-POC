/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: [
    {
      source: "/api/:path*",
      destination: "/app/api/:path*",
    },
  ],
};

export default nextConfig;
