import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.enitiy';

@ObjectType()
export class Auth {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
