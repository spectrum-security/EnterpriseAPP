module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true,
    proxy: process.env.VUE_APP_BASE_URL
  }
};
