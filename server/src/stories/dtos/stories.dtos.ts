import { IsString, IsUrl, IsNotEmpty, IsDefined } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  readonly created_at: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsUrl()
  @IsNotEmpty()
  readonly url: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  readonly story_title: string;

  @IsString()
  @IsNotEmpty()
  readonly story_url: string;
}

export class UpdateStoryDto extends PartialType(CreateStoryDto) {}
