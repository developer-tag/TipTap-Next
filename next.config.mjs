// next.config.mjs
import withTM from 'next-transpile-modules';

const nextConfig = {
  transpilePackages: ['reactjs-tiptap-editor'],
  webpack: (config) => {
    // Add CSS handling
    config.module.rules.push({
      test: /\.css$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['tailwindcss', 'autoprefixer'],
            },
          },
        },
      ],
    });
    
    // Add font handling
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
};

export default withTM(['react-tweet', 'reactjs-tiptap-editor'])(nextConfig);