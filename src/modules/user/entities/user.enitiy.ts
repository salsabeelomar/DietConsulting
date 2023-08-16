import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Question id ' })
  id: number;

  @Field(() => String, { description: 'User Title ' })
  email: string;

  @Field(() => String, { description: 'User Role ' })
  role: string;

  @Field(() => String, { description: 'User FirstName ' })
  fname: string;

  @Field(() => String, { description: 'User userName ' })
  username: string;

  @Field(() => String, { description: 'User MiddleName ' })
  mname: string;

  @Field(() => String, { description: 'User LastName' })
  lname: string;

  @Field(() => Date, { description: 'User Creation Time' })
  createdAt: Date;

  @Field(() => Date, { description: 'User Updated Time' })
  updatedAt: Date;
}
