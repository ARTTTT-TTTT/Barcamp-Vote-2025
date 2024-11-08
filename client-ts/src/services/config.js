const isProd = import.meta.env.VITE_NODE_ENV === "production";

const config = {
    isProd,
    apiPrefix: isProd ? "/api" : import.meta.env.VITE_API_PREFIX,
    key: isProd ? import.meta.env.VITE_APP_KEY : "barcamp007",
};

export default config;
