module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/admin/' : '/',

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
};
