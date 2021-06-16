import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { StoriesController } from './controllers/stories.controller';
import { StoriesService } from './services/stories.service';
import { Story, StorySchema } from './entities/story.entity';
import { StoriesSchedulingService } from './services/stories-scheduling.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Story.name,
        schema: StorySchema,
      },
    ]),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [StoriesController],
  providers: [StoriesService, StoriesSchedulingService, StoriesService],
})
export class StoriesModule {}
