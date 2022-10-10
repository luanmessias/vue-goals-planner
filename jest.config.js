module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/src/**/*.spec.[jt]s?(x)'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js'],
}
