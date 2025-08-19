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
      throw new UnauthorizedException('Unauthorized user');
    }
    try {
      const payload: { email: string; type: ValueOf<typeof JwtTokenType> } =
        await this.jwtService.verifyAsync(token);
      if (payload.type !== JwtTokenType.ACCESS) {
        throw new UnauthorizedException('Unauthorized user');
      }
      const user = await this.userService.findByEmail(payload.email);

      request.user = user;
    } catch {
      throw new UnauthorizedException('Unauthorized user');
    }
    return true;
  }

  private extractTokenFromHeader(
    request: AuthTokenRequest,
  ): string | undefined {
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Unauthorized user');
    }
    const [type, token] = request.headers.authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
