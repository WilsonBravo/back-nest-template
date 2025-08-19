import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '@/common/guards/guards';
import { type AuthTokenRequest } from '@/common/types/types';
import { UserDto } from '@/modules/users/dto/dto';

import { AuthService } from './auth.service';
import { UserAuthResponse, UserSignInDto } from './dto/dto';

@ApiTags('auth')
@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('verify-token')
  @ApiOperation({ summary: 'Verificación de Token' })
  @ApiOkResponse({ type: UserDto, isArray: false })
  verifyToken(@Request() req: AuthTokenRequest) {
    const user = req.user;
    return user;
  }

  // @Post('sign-up')
  // @ApiOperation({ summary: 'User Sign Up' })
  // @ApiOkResponse({ type: UserAuthResponse, isArray: false })
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // async signUp(@Body() userData: UserSignUpDto) {
  //   const user = await this.authService.signUp({
  //     userData,
  //   });
  //   return user;
  // }

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign In' })
  @ApiOkResponse({ type: UserAuthResponse, isArray: false })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signIn(@Body() userData: UserSignInDto) {
    const user = await this.authService.signIn({ userData });
    return user;
  }
}

export { AuthController };
