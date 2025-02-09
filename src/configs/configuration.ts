import * as process from 'process';
//import { Config } from './config.type';

export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  database: {
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    host: process.env.POSTGRES_HOST || '0.0.0.0',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'default-access-secret',
    accessExpiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES_IN, 10) || 3600,
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
    refreshExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10) || 86400,
  },
});

