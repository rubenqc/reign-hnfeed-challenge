import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoriesModule } from './stories/stories.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
      }),
    }),
    HttpModule,
    StoriesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'STORIES',
      useFactory: async (http: HttpService) => {
        const stories = await http
          .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
          .toPromise();
        return stories.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
