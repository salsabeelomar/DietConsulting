import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Roles } from 'src/common/types/role.type';

export class payloadToken {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  username: string;

  @IsEnum(Roles)
  role: Roles = Roles.user;
}
