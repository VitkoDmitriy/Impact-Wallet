import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {

    @ApiProperty({ example: 'Impact-Wallet', description: 'Name of organizations' })
    @Prop({unique: true})
    name: string;

    @ApiProperty({ example: 'Turn your time into equity', description: 'Information about the organization' })
    @Prop()
    description: string;

    @ApiProperty({ example: 'jpg, png', description: 'Logo organization' })
    @Prop()
    logo: string;

    @ApiProperty({ example: 'Impact-Wallet', description: 'name of organizations' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const OrgSchema = SchemaFactory.createForClass(Member);