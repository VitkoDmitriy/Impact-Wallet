import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Org } from './schema/org.schema';
import { FileInterceptor } from "@nestjs/platform-express";
import { OrgsService } from "./orgs.service";
import { CreateOrgDto } from './dto/create-org.dto';

@ApiTags('Orgs')
@Controller('orgs')
export class OrgsController {

    constructor(private readonly orgsService: OrgsService) {
    }

    @ApiOperation({ summary: 'Create organization' })
    @ApiResponse({ status: 201, type: Org })
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @HttpCode(HttpStatus.CREATED)
    createOrg(@Body() createOrgDto: CreateOrgDto,
        @UploadedFile() image): Promise<Org> {
        return this.orgsService.createOrg(createOrgDto, image)
    }

    @ApiOperation({ summary: 'Get organization by name' })
    @ApiResponse({ status: 200, type: [Org] })
    @Get(':name')
    getUserByName(@Param('name') name: string): Promise<Org[]> {
        return this.orgsService.getByName(name);
    }
}
