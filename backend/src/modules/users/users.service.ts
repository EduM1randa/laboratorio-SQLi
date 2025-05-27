import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(
    loginDto: any,
  ): Promise<{ success: boolean; message: string; user?: any }> {
    // Antes de comenzar la lógica, class-validator valida el DTO
    // y lanza una excepción si hay errores de validación.
    const { username, password } = loginDto;

    // Validación simple de credenciales.
    if (!username) throw new BadRequestException('Username is required');
    if (!password) throw new BadRequestException('Password is required');

    // TypeORM busca al usuario por su nombre de usuario.
    const user: User | null = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) throw new NotFoundException('User not found');

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async findAll(username?: string): Promise<User[]> {
    try {
      console.log('Fetching users with username:', username);
      if (username) {
        return await this.userRepository.find({
          where: { username: Like(`%${username}%`) },
        });
      }
      return await this.userRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to retrieve users');
    }
  }
}
