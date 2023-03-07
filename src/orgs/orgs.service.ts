import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DuplicateNameException } from 'src/exceptions/duplicate-name.exception';
import { CreateOrgDto } from './dto/create-org.dto';
import { Org, OrgDocument } from './schema/org.schema';

@Injectable()
export class OrgsService {
    constructor(@InjectModel(Org.name) private orgRepository: Model<OrgDocument>) { };

    async createOrg(orgsDto: CreateOrgDto, image: any): Promise<Org> {
        const oldUser = await this.orgRepository.findOne({ name: orgsDto.name }).exec();
        if (oldUser) throw new DuplicateNameException(`Organization with name '${orgsDto.name}' already exists`);
        if (image) {
            const imageB64 = image.buffer.toString('base64')
            orgsDto.logo = imageB64;

        }
        const newUser = new this.orgRepository(orgsDto);
        return await newUser.save();
    }

    async getByName(name: String): Promise<Org[]> {
        const regex = new RegExp(name.toString(), 'i');
        const orgs = await this.orgRepository.find({ name: regex }).exec();
        if (!orgs) throw new NotFoundException(`Org with name '${name}' not found`);
        return orgs;
    }

    async getById(id: String): Promise<Org> {
        const org = await this.orgRepository.findById(id).exec();
        if (!org) throw new NotFoundException(`Org with id '${id}' not found`);
        return org;
    }

}
