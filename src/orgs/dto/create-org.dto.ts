import { ApiProperty } from "@nestjs/swagger"

export class CreateOrgDto {
@ApiProperty({example: 'Impact-Wallet', description: 'Name of organizations'})    
readonly name: string;
@ApiProperty({example: 'Turn your time into equity', description: 'Information about the organization'})    
readonly description: string;
@ApiProperty({example: 'Logo of organizations', description: 'Logo of organizations'}) 
image?: string;
}