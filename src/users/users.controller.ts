import { Body, Controller, Get, Param, Post, Put, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { HttpCode, Req } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';
import { CreateUserResponseDto } from './dto/create-user.response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {
    }

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, type: CreateUserResponseDto })
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() createUserDto: CreateUserDto,
        @UploadedFile() image): Promise<CreateUserResponseDto> {
        return this.userService.createUser(createUserDto, image)
    }

    @ApiOperation({ summary: 'Add user to organization' })
    @ApiResponse({ status: 200, type: User })
    @Put()
    addOrgToUser(@Body() updateUserDto: UpdateUserDto, @Req() req: Request): Promise<User> {
        return this.userService.addUserToOrg(updateUserDto, req);
    }

    @ApiOperation({ summary: 'Get user by name' })
    @ApiResponse({ status: 200, type: [User] })
    @Get(':name')
    getUserByNickName(@Param('name') name: string, @Req() req: Request): Promise<User[]> {
        return this.userService.getUsersByNickName(name, req);
    }
}
