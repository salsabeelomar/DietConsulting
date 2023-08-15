import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => String, { description: 'Answer Title ' })
  title: string;

  @Field(() => String, { description: 'Answer Description ' })
  description: string;

  @Field(() => Int, { description: 'Question id ' })
  questionId: number;

  @Field(() => Boolean, { description: 'Answer id ' })
  isDraft: boolean;

  @Field(() => [String], { description: 'Answer id ' })
  recommendations: [string];
}
