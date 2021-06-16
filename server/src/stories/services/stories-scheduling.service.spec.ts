import { Test, TestingModule } from '@nestjs/testing';
import { StoriesSchedulingService } from './stories-scheduling.service';

describe('StoriesSchedulingService', () => {
  let service: StoriesSchedulingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoriesSchedulingService],
    }).compile();

    service = module.get<StoriesSchedulingService>(StoriesSchedulingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
