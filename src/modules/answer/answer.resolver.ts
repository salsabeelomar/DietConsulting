import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { User } from 'src/common/decorator/user.decorator';
import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { TransactionInter } from 'src/common/interceptor/Transaction.interceptor';
import { Transaction } from 'sequelize';
import { Role } from 'src/common/decorator/role.decorator';
import { Roles } from 'src/common/types/role.type';

@UseInterceptors(TransactionInter)
@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Role(Roles.consultant)
  @Mutation(() => Answer)
  createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
    @User() user,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.answerService.create(createAnswerInput, user.id, trans);
  }

  @Role(Roles.consultant)
  @Query(() => [Answer])
  findAll(@User() user, @TransactionDeco() trans: Transaction) {
    return this.answerService.findAllUserAnswer(user.id, trans);
  }

  @Role(Roles.consultant)
  @Mutation(() => String)
  updateAnswer(
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
    @User() user,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.answerService.update(user.id, updateAnswerInput, trans);
  }

  @Role(Roles.consultant)
  @Mutation(() => String)
  removeAnswer(
    @Args('id', { type: () => Int }) id: number,
    @User() user,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.answerService.remove(id, user.id, trans);
  }
}
