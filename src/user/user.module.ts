import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestModel } from 'src/test/test.model';
import { TestResModel } from 'src/test-res/test-res.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserModel, TestModel, TestResModel]), ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
    }),
  })],
  providers: [UserService]
})
export class UserModule { }
