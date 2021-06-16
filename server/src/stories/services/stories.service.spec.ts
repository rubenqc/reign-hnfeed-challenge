import { Test, TestingModule } from '@nestjs/testing';
import { HttpService, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import { StoriesService } from './stories.service';
import { Story } from '../entities/story.entity';

const mockHttpService = () => ({
  get: jest.fn(),
});
const mockStoryModel = () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
});

describe('StoriesService', () => {
  let storyService;
  let storyModel;
  let httpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoriesService,
        {
          provide: HttpService,
          useFactory: mockHttpService,
        },
        {
          provide: getModelToken(Story.name),
          useFactory: mockStoryModel,
        },
      ],
    }).compile();

    storyService = module.get<StoriesService>(StoriesService);
    storyModel = module.get(getModelToken(Story.name));
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(storyService).toBeDefined();
  });

  describe('findAll', () => {
    it('calls StoryModel.find and return the result', async () => {
      storyModel.find.mockResolvedValue('someValue');
      const result = await storyService.findAll();
      expect(result).toEqual('someValue');
    });
  });

  describe('findOne', () => {
    it('calls StoryModel.findById and return the result', async () => {
      storyModel.findById.mockResolvedValue('someValue');
      const result = await storyService.findOne('someId');
      expect(result).toEqual('someValue');
    });

    it('calls StoryModel.findById and handles an error', () => {
      storyModel.findById.mockResolvedValue(null);
      expect(storyService.findOne('someId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('calls StoryModel.create and return the result', async () => {
      const mockStory = {
        created_at: 'some_date',
        title: 'Title test',
        url: 'https://test.com',
        author: 'Author test',
        story_title: 'Story title test',
        story_url: 'Story url test',
      };

      storyModel.create.mockResolvedValue('someValue');
      const result = await storyService.create(mockStory);
      expect(result).toEqual('someValue');
    });
  });

  describe('update', () => {
    const mockUpdateStoryDto = {
      created_at: 'some_date',
      title: 'Title test',
      url: 'https://test.com',
      author: 'Author test',
      story_title: 'Story title test',
      story_url: 'Story url test',
    };

    it('calls StoryModel.findByIdAndUpdate and return the result', async () => {
      storyModel.findByIdAndUpdate.mockResolvedValue('someValue');
      const result = await storyService.update('someId', mockUpdateStoryDto);
      expect(result).toEqual('someValue');
    });

    it('calls StoryModel.findByIdAndUpdate and handles an error', () => {
      storyModel.findByIdAndUpdate.mockResolvedValue(null);
      expect(storyService.update('someId', mockUpdateStoryDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('calls StoryModel.findByIdAndDelete and return the result', async () => {
      storyModel.findByIdAndDelete.mockResolvedValue('someValue');
      const result = await storyService.delete('someId');
      expect(result).toEqual('someValue');
    });
  });

  describe('loadData', () => {
    it('calls StoryModel. and return the result', async () => {
      httpService.get.mockResolvedValue(() => ({
        toPromise: () => 'someValue',
      }));
      const result = await storyService.loadData();
      expect(result).toEqual('someValue');
    });
  });
});
