import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {

    @ApiProperty({ example: 'CEO', description: 'Occupation in organization' })
    @Prop()
    occupation: string;

    @ApiProperty({ example: 'Member, Admin or Co-Owner', description: 'Role in organization' })
    @Prop()
    role: Role;

    @ApiProperty({ example: '1.5', description: 'Impact ratio' })
    @Prop()
    impactRatio: number;

    @ApiProperty({ example: '1500', description: 'Monthly compensation' })
    @Prop()
    monthlyCompensation: number;

    @ApiProperty({ example: 'false', description: 'Auto contribution' })
    @Prop()
    autoContribution: boolean;

    @ApiProperty({ example: 'agreement.pdf', description: 'Work agreement' })
    @Prop()
    agreement: string;

    @ApiProperty({ example: '0b1bd52d-7d8e-4518-b0a3-13ae5ad52d47', description: 'User id' })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const MemberSchema = SchemaFactory.createForClass(Member);