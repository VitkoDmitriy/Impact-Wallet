import { ApiProperty } from "@nestjs/swagger"

export class SearchUserByNicknameDto {
    @ApiProperty({ example: 'Dmitry', description: 'Nickname of user', required: true })
    readonly nickname: string;
}