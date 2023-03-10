import { ApiProperty } from "@nestjs/swagger"
export class OrgsFilter {
    
    @ApiProperty({ example: 'Impact-Wallet', description: 'Search by name of organizations', required: false })
    name?: string;
    @ApiProperty({ example: 'false', description: 'If you need an exact match, this field  must be "true"', required: false })
    exactMatch?: boolean;
}
