const envConfig = {
    database_uri: process.env.DATABASE_URI,
    environment: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8080,
    riotKey: process.env.RIOT_API,
};

export const {
    database_uri,
    environment,
    port,
    riotKey
} = envConfig;