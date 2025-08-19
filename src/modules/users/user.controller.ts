import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserDto } from './dto/dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('experts')
  @ApiOperation({ summary: 'Encontrar los nombres de los peritos' })
  @ApiOkResponse({ type: UserDto, isArray: false })
  async findByEmail() {
    const users = await this.userService.findExpertNames();
    return users;
  }
}
