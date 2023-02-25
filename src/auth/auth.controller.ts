import { UseGuards } from '@nestjs/common/decorators';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Auth } from './decorators/auth.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @Auth('admin')
  async register(@Body() dto: AuthDto) {
    return await this.authService.register(dto)
  }

  @Post('login')
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto)
  }
}
