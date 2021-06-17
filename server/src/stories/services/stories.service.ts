import {
  HttpService,
  Injectable,
  NotFoundException,
  Logger,
  Inject,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Story } from '../entities/story.entity';
import { CreateStoryDto, UpdateStoryDto } from '../dtos/stories.dto';

@Injectable()
export class StoriesService {
  private readonly logger = new Logger(StoriesService.name);

  constructor(
    private http: HttpService,
    @InjectModel(Story.name) private storyModel: Model<Story>,
  ) {}
  async onModuleInit() {
    await this.loadData();
  }

  findAll() {
    return this.storyModel.find().sort('-created_at');
  }

  async findOne(id: string) {
    const found = await this.storyModel.findById(id);
    if (!found) {
      throw new NotFoundException(`Story #${id} not found.`);
    }
    return found;
  }

  create(payload: CreateStoryDto) {
    return this.storyModel.create(payload);
  }

  async update(id: string, payload: UpdateStoryDto) {
    const story = await this.storyModel.findByIdAndUpdate(
      id,
      {
        $set: payload,
      },
      { new: true },
    );

    if (!story) {
      throw new NotFoundException(`Story #${id} not found`);
    }

    return story;
  }

  delete(id: string) {
    return this.storyModel.findByIdAndDelete(id);
  }

  async loadData() {
    let stories: [];
    try {
      await this.storyModel.deleteMany({});
      const result = await this.http
        .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
        .toPromise();
      stories = result.data && result.data.hits;
      if (!stories) {
        return false;
      }
      await Promise.all(
        stories.map(async (story: Story) =>
          this.storyModel.create({
            created_at: story.created_at,
            title: story.title,
            url: story.url,
            author: story.author,
            story_title: story.story_title,
            story_url: story.story_url,
          }),
        ),
      );
      return true;
    } catch (e) {
      this.logger.error(e.message);
      return false;
    }
  }
}
