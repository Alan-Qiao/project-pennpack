module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: ['require-context-hook'],
  targets: { node: 'current' },
};
