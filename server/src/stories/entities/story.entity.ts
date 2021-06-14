import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Story extends Document {
  @Prop({ type: Date })
  created_at: string;

  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  author: string;

  @Prop()
  story_title: string;

  @Prop()
  story_url: string;
}

export const StorySchema = SchemaFactory.createForClass(Story);
