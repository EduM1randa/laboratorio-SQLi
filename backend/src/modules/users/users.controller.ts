import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.usersService.login(loginDto);
      if (!result.success) {
        throw new UnauthorizedException(result.message);
      }
      return result;
    } catch (e) {
      throw new UnauthorizedException('Login failed: ' + e.message);
    }
  }

  @Get()
  async getAllUsers(@Query('username') username?: string) {
    try {
      return await this.usersService.findAll(username);
    } catch (e) {
      throw new UnauthorizedException('Failed to retrieve users: ' + e.message);
    }
  }
}
