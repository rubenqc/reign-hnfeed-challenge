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
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { StoriesService } from '../services/stories.service';
import { CreateStoryDto, UpdateStoryDto } from '../dtos/stories.dto';

@ApiTags('stories')
@Controller('stories')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getStories(): any {
    return this.storiesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getStory(@Param('id', ParseIntPipe) id: number): any {
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
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStoryDto,
  ) {
    return this.storiesService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.storiesService.delete(id);
  }
}
