import { Controller, Get, Param, Body } from '@nestjs/common';
import { HttpCode, Patch, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from './decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('profile')
  @Auth('user')
  async getProfile(@User('id') id: number) {
    return this.userService.getById(id)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('profile/:id')
  @Auth('admin')
  async getProfileByAdmin(@Param('id') id: number) {
    return this.userService.getById(id)
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('profile')
  @Auth('user')
  async updateProfile(@User('id') id: number, @Body() dto?: UserDto) {
    return this.userService.updateProfile(id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('profile/:id')
  @Auth('admin')
  async updateProfileByAdmin(@Param('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto)
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('')
  @Auth('admin')
  async getAll() {
    return this.userService.getAll()
  }

}
