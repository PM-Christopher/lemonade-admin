/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        icon: true,
                    },
                },
            ]
        });

        return config;
    },
    images: {
        domains: ['images.unsplash.com', 'dev-lemonade-bucket.lon1.digitaloceanspaces.com', 'encrypted-tbn0.gstatic.com']
    }
};

export default nextConfig;
