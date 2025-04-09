module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Otros plugins primero...
      "react-native-reanimated/plugin", // 🔴 Siempre el último
    ],
  };
};
