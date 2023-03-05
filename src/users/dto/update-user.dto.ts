import { ApiProperty } from "@nestjs/swagger"
import { Org } from "src/orgs/schema/org.schema";

export class UpdateUserDto {
@ApiProperty({example: 'Dmitry', description: 'Name of user'})   
readonly name: string;
@ApiProperty({example: 'Organization model', description: 'Organization'})  
readonly org: Org;
}