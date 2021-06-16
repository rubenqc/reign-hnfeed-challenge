import { Test, TestingModule } from '@nestjs/testing';

import { StoriesController } from './stories.controller';
import { StoriesService } from '../services/stories.service';

const mockStoriesService = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('StoriesController', () => {
  let storiesController: StoriesController;
  let storiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoriesController],
      providers: [
        {
          provide: StoriesService,
          useFactory: mockStoriesService,
        },
      ],
    }).compile();

    storiesController = module.get<StoriesController>(StoriesController);
    storiesService = module.get<StoriesService>(StoriesService);
  });

  it('should be defined', () => {
    expect(storiesController).toBeDefined();
  });

  describe('getStories', () => {
    it('calls StoriesService.findAll and returns the result', async () => {
      storiesService.findAll.mockResolvedValue('someValue');
      const result = await storiesController.getStories();
      expect(result).toEqual('someValue');
    });
  });

  describe('getStory', function () {
    it('calls StoriesService.findOne and returns the result', async () => {
      storiesService.findOne.mockResolvedValue('someValue');
      const result = await storiesController.getStory('someId');
      expect(result).toEqual('someValue');
    });
  });

  describe('create', function () {
    it('calls StoriesService.create and returns the result', async () => {
      const mockCreateStoryDto = {
        created_at: 'some_date',
        title: 'Title test',
        url: 'https://test.com',
        author: 'Author test',
        story_title: 'Story title test',
        story_url: 'Story url test',
      };

      storiesService.create.mockResolvedValue(mockCreateStoryDto);
      const result = await storiesController.create(mockCreateStoryDto);
      expect(result).toEqual(mockCreateStoryDto);
    });
  });

  describe('update', function () {
    it('calls StoriesService.update and returns the result', async () => {
      const mockUpdateStoryDto = {
        created_at: 'some_date',
        title: 'Title test',
        url: 'https://test.com',
        author: 'Author test',
        story_title: 'Story title test',
        story_url: 'Story url test',
      };

      storiesService.update.mockResolvedValue(mockUpdateStoryDto);
      const result = await storiesController.update(
        'someId',
        mockUpdateStoryDto,
      );
      expect(result).toEqual(mockUpdateStoryDto);
    });
  });

  describe('delete', function () {
    it('calls StoriesService.delete and returns the result', async () => {
      storiesService.delete.mockResolvedValue('someValue');
      const result = await storiesController.delete('someId');
      expect(result).toEqual('someValue');
    });
  });
});
