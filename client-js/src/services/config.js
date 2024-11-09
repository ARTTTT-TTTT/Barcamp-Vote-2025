const isProd = process.env.VITE_NODE_ENV === "production";

const config = {
    isProd,
    apiPrefix: isProd ? process.env.VITE_API_PREFIX : "http://localhost:8080/api",
    key: isProd ? process.env.VITE_APP_KEY : "barcamp007",
    registerDomain: isProd ? process.env.VITE_REGISTER_DOMAIN : "http://localhost:3000/register",
    secretKey: process.env.VITE_SECRET_KEY,
};

export default config;
