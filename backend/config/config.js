import 'dotenv/config'; // 確保環境變數可讀取

const config = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    define: {
      underscored: true,
    },
    migrationStorageTableName: 'SequelizeMeta',
    migrationStorageExtension: 'cjs',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      underscored: true,
    },
    migrationStorageExtension: 'cjs',
  },
  production: {
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: 'mysql',
    define: {
      underscored: true,
    },
    dialectOptions: {
      socketPath: process.env.INSTANCE_UNIX_SOCKET, // Cloud SQL
    },
    migrationStorageTableName: 'SequelizeMeta',
    migrationStorageExtension: 'cjs',
  },
};

export default config;
