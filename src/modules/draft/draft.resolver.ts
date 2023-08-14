import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DraftService } from './draft.service';
import { Draft } from './entities/draft.entity';
import { CreateDraftInput } from './dto/create-draft.input';
import { UpdateDraftInput } from './dto/update-draft.input';

@Resolver(() => Draft)
export class DraftResolver {
  constructor(private readonly draftService: DraftService) {}

  @Mutation(() => Draft)
  createDraft(@Args('createDraftInput') createDraftInput: CreateDraftInput) {
    return this.draftService.create(createDraftInput);
  }

  @Query(() => [Draft], { name: 'draft' })
  findAll() {
    return this.draftService.findAll();
  }

  @Query(() => Draft, { name: 'draft' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.draftService.findOne(id);
  }

  @Mutation(() => Draft)
  updateDraft(@Args('updateDraftInput') updateDraftInput: UpdateDraftInput) {
    return this.draftService.update(updateDraftInput.id, updateDraftInput);
  }

  @Mutation(() => Draft)
  removeDraft(@Args('id', { type: () => Int }) id: number) {
    return this.draftService.remove(id);
  }
}
