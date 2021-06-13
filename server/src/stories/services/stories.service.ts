import { Injectable, NotFoundException } from '@nestjs/common';

import { Story } from '../entities/story.entity';
import { CreateStoryDto, UpdateStoryDto } from '../dtos/stories.dto';

@Injectable()
export class StoriesService {
  private counterId = 1;
  private stories: Story[] = [
    {
      story_id: 27467999,
      created_at: '2021-06-11T02:41:23.000Z',
      title: null,
      url: null,
      author: 'salawat',
      story_title:
        'FBI Charge 17 with distributing the FBI run ANOM encrypted chat device',
      story_url:
        'https://www.justice.gov/usao-sdca/press-release/file/1402421/download',
    },
    {
      story_id: 27457398,
      created_at: '2021-06-11T01:44:27.000Z',
      title: null,
      url: null,
      author: 'labrador',
      story_title: "Don't Feed the Thought Leaders",
      story_url: 'https://earthly.dev/blog/thought-leaders/',
    },
  ];

  findAll() {
    return this.stories;
  }

  findOne(story_id: number) {
    const story = this.stories.find((item) => item.story_id === story_id);
    if (!story) {
      throw new NotFoundException(`Story #${story_id} not found.`);
    }
    return story;
  }

  create(payload: CreateStoryDto) {
    this.counterId = this.counterId + 1;
    const newStory = {
      story_id: this.counterId,
      ...payload,
    };
    this.stories.push(newStory);
    return newStory;
  }

  update(id: number, payload: UpdateStoryDto) {
    const story = this.findOne(id);
    if (story) {
      const index = this.stories.findIndex((item) => item.story_id === id);
      this.stories[index] = {
        ...story,
        ...payload,
      };
      return this.stories[index];
    }
    return null;
  }

  delete(id: number) {
    const story = this.findOne(id);
    if (story) {
      const index = this.stories.findIndex((item) => item.story_id === id);
      return this.stories.splice(index, 1);
    }
    return null;
  }
}
