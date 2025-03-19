// next.config.mjs
import withTM from 'next-transpile-modules';
const nextConfig = {
  transpilePackages: ['reactjs-tiptap-editor'],
  webpack: (config) => {
    // Add font handling (Keep this part)
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;
