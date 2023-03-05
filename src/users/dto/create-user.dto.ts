import { ApiProperty } from "@nestjs/swagger"
import { Org } from "src/orgs/schema/org.schema";

export class CreateUserDto {
@ApiProperty({example: 'Dmitry', description: 'Name of user'})    
readonly name: string;
@ApiProperty({example: '11', description: 'Organization id number', required: false})    
readonly org?: Org[];
@ApiProperty({example: 'Profile picture', description: 'User photo'}) 
image?: string;
}