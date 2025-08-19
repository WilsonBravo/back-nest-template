import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtTokenType } from '@/common/enums/enums';
import { AuthTokenRequest, ValueOf } from '@/common/types/types';
import { UserService } from '@/modules/users/user.service';

import { VALIDATION_ERRORS } from '../constants/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthTokenRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(VALIDATION_ERRORS.UNAUTHORIZED);
    }
    try {
      const payload: { email: string; type: ValueOf<typeof JwtTokenType> } =
        await this.jwtService.verifyAsync(token);
      if (payload.type !== JwtTokenType.ACCESS) {
        throw new UnauthorizedException(VALIDATION_ERRORS.UNAUTHORIZED);
      }
      const user = await this.userService.findByEmail(payload.email);

      request.user = user;
    } catch {
      throw new UnauthorizedException(VALIDATION_ERRORS.UNAUTHORIZED);
    }
    return true;
  }

  private extractTokenFromHeader(
    request: AuthTokenRequest,
  ): string | undefined {
    if (!request.headers.authorization) {
      throw new UnauthorizedException(VALIDATION_ERRORS.UNAUTHORIZED);
    }
    const [type, token] = request.headers.authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
