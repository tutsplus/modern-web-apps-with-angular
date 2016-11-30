const proxyMiddleware = require('http-proxy-middleware');
const proxyURL = 'http://localhost:9876';

module.exports = {
  ghostMode: false,
  server: {
    middleware: [proxyMiddleware('/api', { target: proxyURL })]
   }
};
