import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Member } from 'src/members/schema/member.schema';

export type OrgDocument = HydratedDocument<Org>;

@Schema()
export class Org {

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
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }] })
    members: Member[];

}

export const OrgSchema = SchemaFactory.createForClass(Org);