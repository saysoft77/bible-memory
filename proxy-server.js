const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 5000; // Proxy server will run on port 5000

// Add CORS headers to all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
});

// Proxy requests to the external API
app.use(
    '/api', // Match requests starting with /api
    createProxyMiddleware({
        target: 'https://bolls.life', // Forward to this target
        changeOrigin: true, // Change the origin of the request to the target URL
        pathRewrite: {
            '^/api': '', // Remove /api prefix when forwarding
        },
    })
);

// Start the proxy server
app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});