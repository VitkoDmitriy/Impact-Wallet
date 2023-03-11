import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Member } from 'src/members/schema/member.schema';
import { User } from 'src/users/schema/user.schema';

export type OfferDocument = HydratedDocument<Offer>;

@Schema()
export class Offer {


    @ApiProperty({ example: 'Approved', description: 'Offer status' })
    @Prop()
    status: Status;

    @ApiProperty({ example: '0b1bd52d-7d8e-4518-b0a3-13ae5ad52d47', description: 'Member id' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
    member: Member;

}

export const OfferSchema = SchemaFactory.createForClass(Offer);