/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000'],
        },
    }
};

export default nextConfig;
