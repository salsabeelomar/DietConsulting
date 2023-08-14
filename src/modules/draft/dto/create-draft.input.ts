import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDraftInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
