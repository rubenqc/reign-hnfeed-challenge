import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesController } from './controllers/stories.controller';
import { StoriesService } from './services/stories.service';

import { Story, StorySchema } from './entities/story.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Story.name,
        schema: StorySchema,
      },
    ]),
  ],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}
