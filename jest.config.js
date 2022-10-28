module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/src/**/*.spec.[jt]s?(x)'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/img/',
    '/imgs/',
    '/assets/',
    '/locales/',
    '/icons/',
    '/icon/',
  ],
  transformIgnorePatterns: ['node_modules/(?!vue-material-design-icons)'],
  moduleNameMapper: {
    '^@icons/(.*)$': '<rootDir>/node_modules/vue-material-design-icons/$1',
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
  },
}
