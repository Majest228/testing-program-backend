import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/user/decorators/user.decorator';
import { TestResDto } from './dto/test-res.dto';
import { TestResService } from './test-res.service';

@Controller('test-res')
export class TestResController {
  constructor(private readonly testResService: TestResService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@User('id') userId: number, @Body() dto: TestResDto) {
    return await this.testResService.create(userId, dto)
  }
}
