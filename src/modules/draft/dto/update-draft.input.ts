import { CreateDraftInput } from './create-draft.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDraftInput extends PartialType(CreateDraftInput) {
  @Field(() => Int)
  id: number;
}
