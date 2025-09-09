export const appConfig = () => ({
  environment: process.env.NODE_ENV || 'production',
  database: {
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    synchronize: process.env.SYNC === 'true' ? true : false,
    autoLoadEntities: process.env.AUTOLOAD === 'true' ? true : false,
  },
});
