import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { CheckExisting } from '../utils/checkExisting';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly reflect: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflect.get('isPublic', context.getHandler());
    if (isPublic) return true;

    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    const token = request.headers.authorization?.split('Bearer ')[1];

    CheckExisting(token, UnauthorizedException, {
      msg: 'You must Login',
      trace: 'AuthGuard',
    });
    try {
      const decoded = this.jwtService.verify(token);
      const user = this.userService.getUserById(decoded.sub);

      request.user = user;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException('Token Expired');
      else if (error instanceof JsonWebTokenError)
        throw new UnauthorizedException('Token  Invalid signature');
    }

    return true;
  }
}
