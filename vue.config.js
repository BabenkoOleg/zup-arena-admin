module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/admin/' : '/',

  devServer: {
    proxy: {
      '/api/admin': {
        target: 'http://localhost:3030',
        pathRewrite: { '^/api/admin': '' },
        changeOrigin: true,
      },
    },
  },
};
