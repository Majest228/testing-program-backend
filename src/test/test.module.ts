import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModel } from './test.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [TypeOrmModule.forFeature([TestModel]), ConfigModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
    }),
  })],
})
export class TestModule { }
