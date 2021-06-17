import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, username, password, host, port, dbName } =
          configService.database;
        return {
          uri: `${connection}://${host}:${port}`,
          user: username,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ]
})
export class DatabaseModule {}
