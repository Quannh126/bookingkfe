/** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//     enabled: process.env.ANALYZE==='true',
// });
// module.exports = (phase, nextConfig) => {
//     nextConfig = {
//         reactStrictMode: true,
//         swcMinify: true,
//         env: {
//             API_URL: process.env.API_URL,
//         },
//         compiler: {
//             styledComponents: true,
//         },
//     };
//     return withBundleAnalyzer(nextConfig);
// };
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        API_URL: process.env.API_URL,
    },
    compiler: {
        styledComponents: true,
    },
};
module.exports = nextConfig;
