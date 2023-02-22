import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModel } from './answer.model';
import { TestModel } from 'src/test/test.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [TypeOrmModule.forFeature([AnswerModel, TestModel]), ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
    }),
  })],
})
export class AnswerModule { }
