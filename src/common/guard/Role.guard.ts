import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../types/role.type';
import { CheckExisting } from '../utils/checkExisting';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class Role implements CanActivate {
  constructor(private reflect: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflect.get<Role[]>('roles', context.getHandler());
    if (!roles) return true;

    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    CheckExisting(request.user, UnauthorizedException, {
      msg: 'User not Exist',
      trace: ' RuleGuard',
    });

    const role = request.user.role;

    CheckExisting(roles === role, ForbiddenException, {
      msg: "Role doesn't Match",
      trace: 'RuleGuard',
    });
    return true;
  }
}
