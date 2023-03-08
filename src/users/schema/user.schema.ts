
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @ApiProperty({ example: 'Dmitry', description: 'Nickname of user' })
  @Prop({ unique: true })
  nickname: string;

  @ApiProperty({ example: 'Dmitry Vitko', description: 'Name of user' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'jpg, png', description: 'Photo user profile' })
  @Prop()
  avatar: string;

  @ApiProperty({ example: '6ZMDvWkKG9v7GhoTjCPd9FyVCQ36YVxxsB7W57At9ShD', description: 'User wallet' })
  @Prop()
  wallet: string;

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);