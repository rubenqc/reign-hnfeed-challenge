import { Test, TestingModule } from '@nestjs/testing';
import { StoriesSchedulingService } from './stories-scheduling.service';
import {StoriesService} from "./stories.service";

const mockStoriesService = () => ({});

describe('StoriesSchedulingService', () => {
  let storiesSchedulingService: StoriesSchedulingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoriesSchedulingService,
        {
          provide: StoriesService,
          useFactory: mockStoriesService
        }
      ],
    }).compile();

    storiesSchedulingService = module.get<StoriesSchedulingService>(StoriesSchedulingService);
  });

  it('should be defined', () => {
    expect(storiesSchedulingService).toBeDefined();
  });
});
