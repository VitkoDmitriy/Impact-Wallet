
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Org } from 'src/orgs/schema/org.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @ApiProperty({ example: 'Dmitry', description: 'Name of user' })
  @Prop({ unique: true })
  name: string;

  @ApiProperty({ example: 'Impact-Wallet', description: 'name of organizations' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Org.name }] })
  org: Org[];

  @ApiProperty({ example: 'jpg, png', description: 'Photo user profile' })
  @Prop()
  image: string;

}

export const UserSchema = SchemaFactory.createForClass(User);