module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Expo preset
    plugins: [
      'react-native-reanimated/plugin', // MUST be last
    ],
  };
};
