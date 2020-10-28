const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withTM = require('next-transpile-modules')([
  'react-native-elements',
  'react-native-vector-icons',
  'react-native-ratings',
  'react-native-status-bar-height',
  'react-native-size-matters',
]); // pass the modules you would like to see transpiled

module.exports = withPlugins(
  [
    [
      withCSS,
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[path]___[local]___[hash:base64:5]',
        },
      },
    ],
    withImages,
    withTM,
    withFonts,
  ],
  {
    webpack: (config) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // Transform all direct `react-native` imports to `react-native-web`
        'react-native$': 'react-native-web',
        'react-native-vector-icons': '@ovaeasy/react-native-vector-icons',
      };
      config.resolve.extensions = ['.web.js', '.web.ts', '.web.tsx', ...config.resolve.extensions];
      return config;
    },
  }
);
