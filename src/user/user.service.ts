import { hash, verify } from "argon2";
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserModel) private readonly usersModel: Repository<UserModel>) { }
    async getById(id: number) {
        const user = await this.usersModel.findOne({
            where: { id },
            relations: { testRes: { test: true }, }
        })

        if (!user) throw new BadRequestException('Пользователь не найден')

        return user
    }

    async updateProfile(id: number, dto: UserDto) {
        const currentUser = await this.getById(id)
        // const hashPass = await hash(dto.password);
        currentUser.name = dto.name
        // currentUser.password = hashPass
        currentUser.surname = dto.surname
        await this.usersModel.save(currentUser)
        return
    }

    async updateProfileByAdmin(id: number, dto: UserDto) {
        const currentUser = await this.getById(id)
        // const hashPass = await hash(dto.password);
        currentUser.name = dto.name
        // currentUser.password = hashPass
        currentUser.surname = dto.surname
        currentUser.isAdmin = dto.isAdmin

        await this.usersModel.save(currentUser)
        return
    }


    async getAll() {
        return await this.usersModel.find()
    }
}
