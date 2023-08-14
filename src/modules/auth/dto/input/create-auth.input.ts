import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { regexPassword } from 'src/common/constant/passwordRegex';
import { Roles } from 'src/common/types/role.type';

@InputType()
export class CreateAuthInput {
  @Field(() => String!)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  username: string;

  @Field(() => String!)
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  lname: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  fname: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  mname: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => Roles)
  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @Matches(regexPassword)
  password: string;
}
