import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { UserDto } from '@/modules/users/dto/dto';
import { FORM_ERR_MESSAGE } from '@/common/constants/constants';

class UserSignUpDto extends OmitType(UserDto, [
  'id',
  'role',
  'createdAt',
  'updatedAt',
]) {
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

export { UserSignUpDto };
