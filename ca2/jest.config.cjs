module.exports = {
  // Use jsdom so DOM globals like `HTMLElement` and `document` exist in tests
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
