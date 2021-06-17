import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { StoriesService } from './stories.service';

@Injectable()
export class StoriesSchedulingService {
  private readonly logger = new Logger(StoriesSchedulingService.name);

  constructor(private storiesService: StoriesService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async log() {
    this.logger.debug('Upload stories: Start');
    const result = await this.storiesService.loadData();
    let status = 'Successful !!';
    if (!result) {
      status = 'Error';
    }
    this.logger.debug(`Upload stories: ${status}`);
  }
}
