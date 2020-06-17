const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/o',
    createProxyMiddleware({
      target: process.env.PROXY_HOST,
      changeOrigin: true,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.PROXY_HOST,
      changeOrigin: true,
    })
  );
  app.use(
    '/media',
    createProxyMiddleware({
      target: process.env.PROXY_HOST,
      changeOrigin: true,
    })
  );
};