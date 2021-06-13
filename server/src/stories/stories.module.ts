import { Module } from '@nestjs/common';
import { StoriesController } from './controllers/stories.controller';
import { StoriesService } from './services/stories.service';

@Module({
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}
