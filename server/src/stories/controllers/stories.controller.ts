import {
  Body,
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpCode,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { StoriesService } from '../services/stories.service';
import { CreateStoryDto, UpdateStoryDto } from '../dtos/stories.dto';

@ApiTags('stories')
@Controller('stories')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getStories() {
    return this.storiesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getStory(@Param('id', MongoIdPipe) id: string) {
    return this.storiesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() payload: CreateStoryDto) {
    return this.storiesService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateStoryDto,
  ) {
    return this.storiesService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.storiesService.delete(id);
  }
}
