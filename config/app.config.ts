export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_MYSQL_HOST,
    port: parseInt(process.env.DATABASE_MYSQL_PORT, 10) || 3306,
  },
});
