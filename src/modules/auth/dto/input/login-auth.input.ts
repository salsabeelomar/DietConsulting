import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  Matches,
} from 'class-validator';
import { regexPassword } from 'src/common/constant/passwordRegex';

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(100)
  username?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @Matches(regexPassword)
  password: string;
}
