import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { DuplicateNameException } from 'src/exceptions/duplicate-name.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { OrgsService } from 'src/orgs/orgs.service';
import { ApiService } from 'src/api-service/api.service';
import { CreateUserResponseDto } from './dto/create-user.response.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>,
        private jwtService: JwtService,
        private orgService: OrgsService,
        private apiService: ApiService) { };

    async getUsersByNicknamePrivate(name: String): Promise<User[]> {
        const regex = new RegExp(name.toString(), 'i');
        const users = await this.userRepository.find({ nickname: regex }).populate('orgs').exec();
        if (!users) throw new NotFoundException(`User with nickname '${name}' not found`);
        return users;
    }

    async getUsersByNickName(name: String, req: Request): Promise<User[]> {
        await this.getUserFromToken(req);
        const users = await this.getUsersByNicknamePrivate(name);
        const response = [];
        users.map((user) => {
            response.push({
                'nickname': user.nickname,
                'name': user.name,
                'orgs': user.orgs,
                'wallet': user.wallet
            })
        });

        return response;
    }

    async createUser(userDto: CreateUserDto, image: any): Promise<CreateUserResponseDto> {
        const oldUser = await this.userRepository.findOne({ nickname: userDto.nickname }).exec();
        if (oldUser) throw new DuplicateNameException(`User with nickname '${userDto.nickname}' already exists`);

        if (image) {
            const imageB64 = image.buffer.toString('base64')
            userDto.avatar = imageB64;
        }

        const newUser = new this.userRepository(userDto);
        const password = uuid();
        newUser.wallet = await this.apiService.createWallet(password);

          if (userDto.orgId) {
            const org = await this.orgService.getById(userDto.orgId)
            newUser.orgs.push(org);
        }

        newUser.password = await bcrypt.hash(password, 5);
        await newUser.save();

        console.log(newUser);

        return await this.generateToken(newUser, password);
    }

    async addUserToOrg(updateUserDto: UpdateUserDto, req: Request): Promise<User> {
        const user = await this.getUserFromToken(req);
        const oldUser = await this.userRepository.findOne({ name: user.name }).exec();
        if (!oldUser) throw new NotFoundException(`User with name '${oldUser.name}' not found`);
        const org = await this.orgService.getById(updateUserDto.orgId)
        oldUser.orgs.push(org);
        await oldUser.save();
        return oldUser;

    }

    private async generateToken(user: User, password: string): Promise<CreateUserResponseDto> {
        const payload = { name: user.name, nickname: user.nickname, orgs: user.orgs, wallet: user.wallet }
        let response: CreateUserResponseDto = {
            secretLink: password,
            token: this.jwtService.sign(payload)
        }
        
        return response; 
    }

    async getUserFromToken(req: Request): Promise<User> {
        const authHeader = req.headers['authorization'];
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({ message: 'User not authorized' })
        }
        const user = this.jwtService.verify(token);
        return user;

    }


}
