/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000'],
        },
        serverComponentsExternalPackages: ['argon2'],
    }
};

export default nextConfig;
