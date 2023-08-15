import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { User } from 'src/modules/user/entities/user.enitiy';

@ObjectType()
export class Question {
  @Field(() => Int, { description: 'Question id ' })
  id: number;

  @Field(() => String, { description: 'Question Title ' })
  title: string;

  @Field(() => String, { description: 'Question Description ' })
  description: string;

  @Field(() => Int, { description: 'Question user id ' })
  userId: number;

  @Field(() => User, { description: 'Question User Information ' })
  user: User;

  @Field(() => [Answer], { description: 'Question User Information ' })
  answers: Answer[];

  @Field(() => Date, { description: 'Question Creation Time' })
  createdAt: Date;

  @Field(() => Date, { description: 'Question Updated Time' })
  updatedAt: Date;
}
