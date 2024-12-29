const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver:{
        blacklistRE:([/node_modules\/.*\/node_modules\/react-native\/.*/])
    },
    transformer:{
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    watchFolders:['./src']
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
