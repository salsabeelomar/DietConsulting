import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: 'Title for Question' })
  @IsString()
  @MaxLength(100, {
    message: 'Title must be less than 100 character',
  })
  title: string;

  @Field(() => String, { description: 'Description for Question' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500, {
    message: 'Description must be less than 100 character',
  })
  description: string;
}
