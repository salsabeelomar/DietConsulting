import {
  Inject,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Providers } from 'src/common/constant/providers.constant';
import { CheckExisting } from 'src/common/utils/checkExisting';
import { WinstonLogger } from 'src/common/logger/winston.logger';
import { User } from '../user/model/user.model';
import { payloadToken } from './dto/payloadToken.dto';
import { UserService } from '../user/user.service';
import { Transaction } from 'sequelize';
import { CreateAuthInput } from './dto/input/create-auth.input';
import { LoginInput } from './dto/input/login-auth.input';

@Injectable()
export class AuthService {
  private readonly logger = new WinstonLogger();

  constructor(
    @Inject(Providers.USER_PROVIDER) private authRepo: typeof User,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async getUserByEmailOrUser(email?: string, username?: string): Promise<User> {
    const getEmail = email && (await this.userService.getUserByEmail(email));
    console.log('geting email', getEmail);
    const getUser =
      getEmail ??
      (username && (await this.userService.getUserByUser(username)));
    console.log('geting email', getUser);
    console.log('getEmail || getUser', getEmail || getUser);

    return getEmail || getUser;
  }
  generateToken(user: payloadToken): string {
    const payload = {
      sub: user.id,
      user: { username: user.username, email: user.email, role: user.role },
    };
    const token = this.jwt.sign(payload);
    this.logger.debug('Sign Token ');
    return token;
  }

  async signIn(userInfo: LoginInput, transaction: Transaction) {
    const getEmail = await this.getUserByEmailOrUser(
      userInfo?.email,
      userInfo?.username,
    );

    CheckExisting(getEmail, BadRequestException, {
      msg: 'Email or Username not Exist',
      trace: 'AuthService.SignIn',
    });

    const getPass = await this.authRepo.findByPk(getEmail.id, {
      attributes: ['id', 'email', 'password', 'username', 'role'],
    });
    const match =
      getPass && (await bcrypt.compare(userInfo.password, getPass.password));

    CheckExisting(match, UnauthorizedException, {
      msg: 'Password not correct',
      trace: 'AuthService.SignIn',
    });

    this.logger.log(`User Signed with id ${getPass.id} `);
    const user: payloadToken = {
      id: getPass.id,
      email: getPass.email,
      username: getPass.username,
      role: getPass.role,
    };
    return {
      ...user,
      token: this.generateToken(user),
    };
  }

  async signup(userInfo: CreateAuthInput, transaction: Transaction) {
    const getEmail = await this.getUserByEmailOrUser(
      userInfo.email,
      userInfo.username,
    );
    CheckExisting(!getEmail, BadRequestException, {
      msg: 'Email Or UserName is Exists',
      trace: 'AuthService.signup',
    });

    const hashedPass = bcrypt.hashSync(userInfo.password, 10);

    const newUser = await this.authRepo.create<User>(
      {
        ...userInfo,
        password: hashedPass,
      },
      {
        transaction,
      },
    );

    this.logger.log(`User Signup with id ${newUser.id} `);

    const user: payloadToken = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
    };
    return {
      ...user,
      token: this.generateToken(user),
    };
  }
}
