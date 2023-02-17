import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './user.model';
import { ConfigModule } from '@nestjs/config';
import { TestModel } from 'src/test/test.model';
import { TestResModel } from 'src/test-res/test-res.model';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserModel, TestModel, TestResModel]), ConfigModule],
  providers: [UserService]
})
export class UserModule { }
