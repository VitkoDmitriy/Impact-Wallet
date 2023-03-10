import { ApiProperty } from "@nestjs/swagger"

export class AddMemberToOrgDto {

    @ApiProperty({ example: 'CEO', description: 'Occupation in organization' })
    occupation: string;

    @ApiProperty({ example: 'Member, Admin or Co-Owner', description: 'Role in organization' })
    role: Role;

    @ApiProperty({ example: '1.5', description: 'Impact ratio' })
    impactRatio: number;

    @ApiProperty({ example: '1500', description: 'Monthly compensation' })
    monthlyCompensation: number;

    @ApiProperty({ example: 'false', description: 'Auto contribution' })
    autoContribution: boolean;

    @ApiProperty({ example: 'agreement.pdf', description: 'Work agreement' })
    agreement: string;

    @ApiProperty({ example: '0b1bd52d-7d8e-4518-b0a3-13ae5ad52d47', description: 'User id' })
    user: string;
}