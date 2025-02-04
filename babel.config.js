module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [['react-native-reanimated/plugin'], ['module-resolver',
    {
      root: ['./app'],
      alias: {
        '@components': './app/components',
        '@utils': './app/utils',
        '@hooks': './app/hooks',
        '@constant': './app/constant',
        '@types': './app/constant'
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }]],
};