import { ApiProperty } from "@nestjs/swagger"

export class CreateOrgDto {
    @ApiProperty({ example: 'Impact-Wallet', description: 'Name of organizations', required: true })
    name: string;

    @ApiProperty({ example: 'Turn your time into equity', description: 'Information about the organization', required: false })
    description: string;

    @ApiProperty({ example: 'https://impact-wallet.com', description: 'Organization link', required: false })
    link: string;

    @ApiProperty({ example: '30', description: 'Reserved for organization needs', required: false })
    treasure: number;

    @ApiProperty({ example: 'jpg, png', description: 'Logo organization', required: false })
    logo: string;

}