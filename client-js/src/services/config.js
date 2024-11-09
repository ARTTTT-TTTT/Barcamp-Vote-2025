const isProd = process.env.VITE_NODE_ENV === "production";

const config = {
    isProd,
    apiPrefix: isProd ? "/api" : process.env.VITE_API_PREFIX,
    key: isProd ? process.env.VITE_APP_KEY : "barcamp007",
};

export default config;
