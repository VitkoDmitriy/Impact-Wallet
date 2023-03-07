import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, ObjectId } from 'mongoose';

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

}

export const OrgSchema = SchemaFactory.createForClass(Org);