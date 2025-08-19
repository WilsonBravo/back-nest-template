import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { FORM_ERR_MESSAGE } from '@/common/constants/constants';

class UserSignInDto {
  @ApiProperty()
  @IsEmail(undefined, { message: FORM_ERR_MESSAGE.VALID })
  email!: string;

  @ApiProperty()
  @IsString({ message: FORM_ERR_MESSAGE.VALID })
  @MinLength(6, { message: FORM_ERR_MESSAGE.REQUIRED })
  @MaxLength(24, { message: FORM_ERR_MESSAGE.max(50) })
  @Matches(/[A-Z]/, {
    message: FORM_ERR_MESSAGE.patternAtLeast('una mayúscula'),
  })
  @Matches(/[a-z]/, {
    message: FORM_ERR_MESSAGE.patternAtLeast('una minúscula'),
  })
  @Matches(/\d/, {
    message: FORM_ERR_MESSAGE.patternAtLeast('un número'),
  })
  @Matches(/[^\dA-Za-z]/, {
    message: FORM_ERR_MESSAGE.patternAtLeast('un caracter especial'),
  })
  password!: string;
}

export { UserSignInDto };
