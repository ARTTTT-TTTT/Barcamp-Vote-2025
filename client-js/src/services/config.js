const isProd = process.env.REACT_APP_NODE_ENV === "production";

const config = {
    isProd,
    apiPrefix: isProd ? process.env.REACT_APP_API_PREFIX : "http://localhost:8080/api",
    key: isProd ? process.env.REACT_APP_KEY : "barcamp007",
    registerDomain: isProd ? process.env.REACT_APP_REGISTER_DOMAIN : "http://localhost:3000/register",
    secretKey: process.env.REACT_APP_SECRET_KEY,
};

export default config;
