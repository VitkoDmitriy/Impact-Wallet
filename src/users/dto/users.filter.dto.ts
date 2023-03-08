import { ApiProperty } from "@nestjs/swagger"
export class UsersFilter {
    @ApiProperty({ example: 'Dmitry', description: 'Nickname of user', required: false })
    nickname?: string;
    @ApiProperty({ example: 'Dmitry Vitko', description: 'Name of user', required: false })
    name?: string;
    @ApiProperty({ example: 'false', description: 'If you need an exact match, this field  must be "true"', required: false })
    exactMatch?: boolean;
}
