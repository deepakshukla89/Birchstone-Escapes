const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/hospitable',
        createProxyMiddleware({
            target: 'https://public.api.hospitable.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api/hospitable': '', // Remove /api/hospitable prefix
            },
            onProxyReq: (proxyReq, req, res) => {
                // Log proxy requests for debugging
                console.log('Proxying request to:', proxyReq.path);
            },
        })
    );
};
