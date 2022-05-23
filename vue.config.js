const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_mixins.scss";
          @import "@/scss/_vars.scss";
        `,
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        icons: path.resolve(
          __dirname,
          'node_modules/vue-material-design-icons'
        ),
      },
      extensions: ['.vue'],
    },
  },
})
