/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: "/api/offers",
            destination: "https://dummy-1.hiublue.com/api/offers",
          },
        ];
      },
};

export default nextConfig;
