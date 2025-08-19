import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtTokenType } from '@/common/enums/enums';

import { UserService } from '../users/user.service';
import { UserAuthResponse, UserSignInDto, UserSignUpDto } from './dto/dto';

@Injectable()
class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({
    userData,
  }: {
    userData: UserSignInDto;
  }): Promise<UserAuthResponse> {
    const user = await this.userService.comparePassword(userData);

    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      type: JwtTokenType.ACCESS,
    });

    return { ...user, accessToken };
  }

  async signUp({
    userData,
  }: {
    userData: UserSignUpDto;
  }): Promise<UserAuthResponse> {
    const user = await this.userService.createUser({ userData });

    const accessToken = await this.jwtService.signAsync({
      email: user.email,
      type: JwtTokenType.ACCESS,
    });

    return { ...user, accessToken };
  }
}

export { AuthService };
