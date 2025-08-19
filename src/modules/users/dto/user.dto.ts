import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

import { UserRole } from '@/common/enums/enums';
import { FORM_ERR_MESSAGE } from '@/common/constants/constants';

export class UserDto {
  @ApiProperty({ description: 'El identificador único del usuario.' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'El primer nombre del usuario.' })
  @IsString()
  @MinLength(1, { message: FORM_ERR_MESSAGE.REQUIRED })
  @MaxLength(50, { message: FORM_ERR_MESSAGE.max(50) })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/, {
    message: FORM_ERR_MESSAGE.ONE_WORD,
  })
  firstName: string;

  @ApiProperty({ description: 'El segundo nombre del usuario.' })
  @IsString()
  @MinLength(1, { message: FORM_ERR_MESSAGE.REQUIRED })
  @MaxLength(50, { message: FORM_ERR_MESSAGE.max(50) })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/, {
    message: FORM_ERR_MESSAGE.ONE_WORD,
  })
  middleName: string;

  @ApiProperty({ description: 'El primer apellido del usuario.' })
  @IsString()
  @MinLength(1, { message: FORM_ERR_MESSAGE.REQUIRED })
  @MaxLength(50, { message: FORM_ERR_MESSAGE.max(50) })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/, {
    message: FORM_ERR_MESSAGE.ONE_WORD,
  })
  firstLastName: string;

  @ApiProperty({ description: 'El segundo apellido del usuario.' })
  @IsString()
  @MinLength(1, { message: FORM_ERR_MESSAGE.REQUIRED })
  @MaxLength(50, { message: FORM_ERR_MESSAGE.max(50) })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/, {
    message: FORM_ERR_MESSAGE.ONE_WORD,
  })
  secondLastName: string;

  @ApiProperty({
    description: 'La dirección de correo electrónico del usuario.',
  })
  @IsEmail(undefined, { message: FORM_ERR_MESSAGE.VALID })
  email: string;

  @ApiProperty({
    description: 'El rol del usuario.',
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsEnum(UserRole, { message: FORM_ERR_MESSAGE.VALID })
  role: keyof typeof UserRole;

  @ApiProperty({ description: 'La fecha de creación del usuario.' })
  createdAt: Date;

  @ApiProperty({ description: 'La última fecha de actualización del usuario.' })
  updatedAt: Date;
}
