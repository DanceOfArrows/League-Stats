"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.riotKey = exports.port = exports.environment = exports.database_uri = void 0;
var envConfig = {
  database_uri: process.env.DATABASE_URI,
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8080,
  riotKey: process.env.RIOT_API
};
var database_uri = envConfig.database_uri,
    environment = envConfig.environment,
    port = envConfig.port,
    riotKey = envConfig.riotKey;
exports.riotKey = riotKey;
exports.port = port;
exports.environment = environment;
exports.database_uri = database_uri;