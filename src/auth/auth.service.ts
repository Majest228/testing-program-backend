import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto';
import { hash, verify } from "argon2";
import { RefreshTokenDto } from './dto/refresh.token.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserModel)
        private readonly userModel: Repository<UserModel>,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: AuthDto) {
        const checkUser = await this.userModel.findOneBy({ login: dto.login })

        if (checkUser) throw new BadRequestException('Пользователь с такой почтой уже существует')

        const hashPass = await hash(dto.password);

        const newUser = await this.userModel.create({
            login: dto.login,
            password: hashPass,
            name: dto.name,
            surname: dto.surname
        })

        const tokens = await this.createToken(newUser)
        const user = await this.userModel.save(newUser)

        return {
            user: this.returnUserFields(user),
            ...tokens,
        }
    }

    async login(dto: AuthDto) {
        const user = await this.userModel.findOne({
            where: {
                login: dto.login
            }

        })

        if (!user) {
            throw new BadRequestException('Такого пользователя не существует ')
        }
        const checkUser = await verify(user.password, dto.password)

        if (!checkUser) throw new UnauthorizedException('Пароль неверный')

        const tokens = await this.createToken(user)

        return {
            user: this.returnUserFields(user),
            ...tokens,
        }
    }

    async getNewTokens({ refreshToken }: RefreshTokenDto) {
        if (!refreshToken) throw new UnauthorizedException('Please sign in!')

        const result = await this.jwtService.verifyAsync(refreshToken)

        if (!result) throw new UnauthorizedException('Invalid token or expired!')

        const user = await this.userModel.findOneBy(result.id)

        const tokens = await this.createToken(user)

        return {
            user: this.returnUserFields(user),
            ...tokens,
        }
    }


    async createToken(user: UserModel) {
        const data = { id: user.id, login: user.login }
        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '15d',
        })

        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '24h',
        })
        return { refreshToken, accessToken }
    }

    returnUserFields(user: UserModel) {
        return {
            id: user.id,
            login: user.login,
        }
    }
}
