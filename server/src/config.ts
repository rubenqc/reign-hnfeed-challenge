import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    dbName: process.env.MONGO_DB,
    port: parseInt(process.env.MONGO_PORT),
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    host: process.env.MONGO_HOST,
    connection: process.env.MONGO_CONNECTION,
  },
}));
