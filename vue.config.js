const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_mixins.scss";
          @import "@/scss/_vars.scss";
          @import "@/scss/_reset.scss";
        `,
      },
    },
  },
})
