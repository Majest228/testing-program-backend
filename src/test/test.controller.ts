import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/user/decorators/user.decorator';
import { TestDto } from './dto/test.dto';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@User('id') ownerId: number, @Body() dto: TestDto) {
    return await this.testService.create(ownerId, dto)
  }

  @Get()
  async getAll() {
    return await this.testService.getAll()
  }
}
