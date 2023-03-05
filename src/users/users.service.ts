import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DuplicateNameException } from 'src/exeptions/duplicate-name.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>) { };

    async getByName(name: String): Promise<User[]> {
        const regex = new RegExp(name.toString(), 'i');
        const users = await this.userRepository.find({ name: regex }).populate('org').exec();
        if (!users) throw new NotFoundException(`User with name '${name}' not found`);
        return users;
    }

    async createUser(userDto: CreateUserDto, image: any): Promise<User> {
        const oldUser = await this.userRepository.findOne({ name: userDto.name }).exec();
        if (oldUser) throw new DuplicateNameException(`User with name '${userDto.name}' already exists`);
        if (image) {
            const imageB64 = image.buffer.toString('base64')
            userDto.image = imageB64;
        }
        const newUser = new this.userRepository(userDto);
        return await newUser.save();
    }

    async addUserToOrg(updateUserDto: UpdateUserDto): Promise<User> {
        const oldUser = await this.userRepository.findOne({ name: updateUserDto.name }).exec();
        if (!oldUser) throw new NotFoundException(`User with name '${updateUserDto.name}' not found`);
        oldUser.org.push(updateUserDto.org);
        await oldUser.save();
        return oldUser;

    }

}
