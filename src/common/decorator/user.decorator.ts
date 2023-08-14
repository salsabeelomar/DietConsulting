import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    return request.user;
  },
);
