import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from 'src/user/user.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserModel)
    private readonly userModel: Repository<UserModel>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  async validate({ id }: Pick<UserModel, 'id'>) {
    return this.userModel.findBy({ id })
  }
}
