import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UserDto } from '@/modules/users/dto/dto';

class UserAuthResponse extends OmitType(UserDto, ['role']) {
  @ApiProperty()
  @IsString()
  accessToken!: string;
}

export { UserAuthResponse };
