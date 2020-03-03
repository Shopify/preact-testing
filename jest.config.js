module.exports = {
  setupFiles: ['./test/setup.ts'],
  setupFilesAfterEnv: ['./test/each-test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  verbose: true,
  testURL: 'http://localhost:8080',
  moduleDirectories: ['node_modules'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)(spec|test).[jt]s?(x)'],
};
