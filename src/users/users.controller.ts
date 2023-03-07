import { Body, Controller, Get, Param, Post, Query, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { HttpCode, Req } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';
import { CreateUserResponseDto } from './dto/create-user.response.dto';
import { UsersFilter } from './users.filter.interface';

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


    @ApiOperation({ summary: 'Get users by query' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getUserByNickName(@Query() query: UsersFilter, @Req() req: Request): Promise<User[]> {
        return this.userService.getUsersByQuery(query, req);
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: 200, type: User })
    @Get(':id')
    getUserByName(@Param('id') id: string, @Req() req: Request): Promise<Object> {
        return this.userService.getByUserId(id, req);
    }
}
