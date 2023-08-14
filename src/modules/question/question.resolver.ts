import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { User } from 'src/common/decorator/user.decorator';
import { Transaction } from 'sequelize';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  createQuestion(
    @Args('addQuestion') createQuestionInput: CreateQuestionInput,
    @User() user,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.questionService.addQuestion(
      createQuestionInput,
      user.id,
      trans,
    );
  }

  @Query(() => [Question], { name: 'question' })
  findAll(@Args('page') page: number, @TransactionDeco() trans: Transaction) {
    return this.questionService.findAll(page, trans);
  }

  // @Query(() => Question, { name: 'question' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.questionService.findOne(id);
  // }

  @Mutation(() => String)
  updateQuestion(
    @Args('updateQuestion') updateQuestion: UpdateQuestionInput,
    @User() user,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.questionService.update(updateQuestion, user.id, trans);
  }

  @Mutation(() => String)
  removeQuestion(
    @Args('id', { type: () => Int }) id: number,
    @User() user,
    @TransactionDeco() trans,
  ) {
    return this.questionService.remove(id, user.id, trans);
  }
}
