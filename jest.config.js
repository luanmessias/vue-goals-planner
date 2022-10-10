module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/src/**/*.spec.[jt]s?(x)'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js'],
  transformIgnorePatterns: ['node_modules/(?!vue-material-design-icons)'],
  moduleNameMapper: {
    '^@icons/(.*)$': '<rootDir>/node_modules/vue-material-design-icons/$1',
  },
}
