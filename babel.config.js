module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": true
        }
      }
    ],
    ['@babel/typescript', { jsxPragma: "h" }],
  ],
  plugins: [
    ['@babel/plugin-transform-react-jsx', { 'pragma': 'h' }]
  ],
  sourceMaps: 'inline',
};
