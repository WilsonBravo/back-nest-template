import { type UserDto } from '@/modules/users/dto/dto';

export type AuthTokenRequest = Request & {
  headers: Request['headers'] & {
    authorization: string;
  };
  user: UserDto;
};
