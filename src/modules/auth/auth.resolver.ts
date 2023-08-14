import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/input/create-auth.input';
import { Public } from 'src/common/decorator/public.decorator';
import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { Transaction } from 'sequelize';
import { UseInterceptors } from '@nestjs/common';
import { TransactionInter } from 'src/common/interceptor/Transaction.interceptor';
import { LoginInput } from './dto/input/login-auth.input';

@UseInterceptors(TransactionInter)
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  signIn(
    @Args('login') loginInput: LoginInput,
    @TransactionDeco() trans: Transaction,
  ) {
    console.log('jjjjjjjjjjjjjjjjjjpppp');
    return this.authService.signIn(loginInput, trans);

  }

  @Public()
  @Mutation(() => Auth)
  async signup(
    @Args('newUser') newUser: CreateAuthInput,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.authService.signup(newUser, trans);
  }
}
