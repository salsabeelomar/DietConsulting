import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Answer {
  @Field(() => String, { description: 'Answer Title ' })
  title: string;

  @Field(() => String, { description: 'Answer Description ' })
  description: string;

  @Field(() => ID, { description: 'Answer id ' })
  id: number;

  @Field(() => ID, { description: 'Question id ' })
  questionId: number;

  @Field(() => Boolean, { description: 'Answer id ' })
  isDraft: boolean;

  @Field(() => String, { description: 'Answer id ' })
  recommendations: string;

  @Field(() => Date, { description: 'Question Creation Time' })
  createdAt: Date;

  @Field(() => Date, { description: 'Question Updated Time' })
  updatedAt: Date;
}
