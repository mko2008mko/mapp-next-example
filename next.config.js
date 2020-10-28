const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');
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
// eslint-disable-next-line import/no-extraneous-dependencies
const cssLoaderGetLocalIdent = require('css-loader/lib/getLocalIdent.js');
const fs = require('fs');
const path = require('path');
const lessToJS = require('less-vars-to-js');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
);

module.exports = withPlugins(
  [
    [
      withCSS,
      {
        cssModules: true,
        cssLoaderOptions: {
          localIdentName: '[path]___[local]___[hash:base64:5]',
          getLocalIdent: (context, localIdentName, localName, options) => {
            const hz = context.resourcePath.replace(context.rootContext, '');
            if (/node_modules/.test(hz)) {
              return localName;
            }
            return cssLoaderGetLocalIdent(context, localIdentName, localName, options);
          },
        },
      },
    ],
    [
      withLess,
      {
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables, // make your antd custom effective
        },
      },
    ],
    withImages,
    withTM,
    withFonts,
  ],
  {
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd-mobile\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        // eslint-disable-next-line no-param-reassign
        config.externals = [
          // eslint-disable-next-line consistent-return
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }
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
