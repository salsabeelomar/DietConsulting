import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Draft {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
