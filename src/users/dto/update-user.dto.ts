import { ApiProperty } from "@nestjs/swagger"
import { Org } from "src/orgs/schema/org.schema";

export class UpdateUserDto {
@ApiProperty({example: '640747051ab3e12b172bb2cc', description: 'Organization id'})  
readonly orgId: string;
}