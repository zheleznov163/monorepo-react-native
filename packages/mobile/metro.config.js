/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro').createBlacklist;
const { getDefaultConfig } = require('metro-config');

// const reactNativePath = require.resolve('react-native');
// const reactNativeFolder = `${
//   reactNativePath.split('node_modules/react-native/')[0]
// }node_modules/react-native/`;

const getConfig = async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false
        }
      })
    },

    watchFolders: [path.resolve(__dirname, '../../')],

    resolver: {
      // extraNodeModules: {
      //   'core': path.resolve(__dirname, '../core'),
      //   'react-native': path.resolve(__dirname, './node_modules/react-native')
      // },
      blacklistRE: blacklist([/#current-cloud-backend\/.*/]),
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  };
};

module.exports = getConfig();
