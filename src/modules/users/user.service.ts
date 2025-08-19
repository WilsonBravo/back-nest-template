import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { DbService } from '@/modules/database/db.service';

import { UserDto } from './dto/dto';
import { UserSignUpDto } from '../auth/dto/dto';

@Injectable()
class UserService {
  private readonly saltRounds: number;
  constructor(
    private dbService: DbService,
    private configService: ConfigService,
  ) {
    const saltRounds = this.configService.get<string>('SALT_ROUNDS');
    if (!saltRounds) {
      throw new Error('SALT_ROUNDS not defined');
    }
    this.saltRounds = Number.parseInt(saltRounds, 10);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.dbService.db.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        firstLastName: true,
        secondLastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findExpertNames(): Promise<UserDto[]> {
    const experts = await this.dbService.db.user.findMany({
      where: { OR: [{ role: 'OPERADOR' }, { role: 'DIRECTOR' }] },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        firstLastName: true,
        secondLastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });

    if (!experts || experts.length === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return experts;
  }

  async createUser({
    userData,
  }: {
    userData: UserSignUpDto;
  }): Promise<UserDto> {
    const userExists = await this.dbService.db.user.findUnique({
      where: { email: userData.email },
      select: {
        email: true,
      },
    });

    if (userExists) {
      throw new ConflictException('An user with this email already exists');
    }

    const hashedPassword = await this.hash(userData.password);
    const user = await this.dbService.db.user.create({
      data: { ...userData, password: hashedPassword },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        firstLastName: true,
        secondLastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });
    return user;
  }

  async comparePassword(payload: {
    email: string;
    password: string;
  }): Promise<UserDto> {
    const user = await this.dbService.db.user.findUnique({
      where: { email: payload.email },
      select: {
        id: true,
        firstName: true,
        middleName: true,
        firstLastName: true,
        secondLastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { password, ...userData } = user;
    const isPassword = await this.compare(payload.password, password);

    if (!isPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return userData;
  }

  private async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  private compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export { UserService };
