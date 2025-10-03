const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

// プロキシ先のURL（例: https://example.com）
const TARGET_URL = "https://example.com";

// すべてのリクエストをプロキシ
app.use("/", createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    pathRewrite: {
        "^/": "/", // ルートはそのままターゲットに送る
    },
    onProxyReq(proxyReq, req, res) {
        console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
    }
}));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Proxy server running on port ${PORT}`);
});
