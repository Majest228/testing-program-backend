import { Module } from '@nestjs/common';
import { TestResService } from './test-res.service';
import { TestResController } from './test-res.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModel } from 'src/test/test.model';
import { TestResModel } from './test-res.model';
import { UserModel } from 'src/user/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TestResController],
  providers: [TestResService],
  imports: [TypeOrmModule.forFeature([TestResModel, TestModel, UserModel]), ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
    }),
  })],
})
export class TestResModule { }
