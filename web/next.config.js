// https://medium.com/frontend-digest/environment-variables-in-next-js-9a272f0bf655
// Bundle env variables
// NO SECRETS OR API KEYS HERE
const withPlugins = require("next-compose-plugins")

const reactSvg = require("next-react-svg")
const path = require("path")

const webpackConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(js|jsx)$/,
            exclude: /node_modules[\/\\](?!(swiper|dom7)[\/\\])/,
            use: [options.defaultLoaders.babel],
        })
        return config
    },
}
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
module.exports = withPlugins(
    [
        [
            reactSvg,
            {
                include: path.resolve(__dirname, "public/assets/svg"),
            },
        ],
    ],
    {
        images: {
            deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            domains: ['mowo-location-images.s3.amazonaws.com', 'mowo-local.s3.amazonaws.com', 'mowo-testing.s3.amazonaws.com', 'mowo-production.s3.amazonaws.com',]
            // loader: "imgix", // Uncomment this line for STATIC EXPORT
            // path: "", // Uncomment this line for STATIC EXPORT
        },
        env: {
            production_type: "server", // Change variable to "static" for STATIC EXPORT
            CLIENT_API_URL: process.env.BASE_SERVER_URL || 'http://127.0.0.1:8000',
        },
        // trailingSlash: true // Uncomment this line for STATIC EXPORT
    },
    webpackConfig
)
