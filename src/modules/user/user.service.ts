import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './model/user.model';
import { Providers } from 'src/common/constant/providers.constant';
import { CheckExisting } from 'src/common/utils/checkExisting';
import { WinstonLogger } from 'src/common/logger/winston.logger';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  private readonly winstonLogger = new WinstonLogger();
  constructor(
    @Inject(Providers.USER_PROVIDER) private readonly userRepo: typeof User,
  ) {}
  create(createQuestionInput) {
    return 'This action adds a new question';
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findByPk(id, {
      attributes: ['email', 'username', 'role'],
    });
    CheckExisting(user, NotFoundException, {
      msg: 'User With ID not Found',
      trace: 'UserService.getUserById ',
    });
    this.winstonLogger.log(`Get User with id= ${id}`);
    return {
      id: id,
      email: user.email,
      role: user.role,
      username: user.username,
    };
  }
  async getUserByEmail(email: string): Promise<User> {
    const getEmailOrUser = await this.userRepo.findOne({
      attributes: ['username', 'email', 'id'],
      where: { email },
    });
    this.winstonLogger.debug('Find Email Or Username');

    return getEmailOrUser;
  }
  async getUserByUser(username: string): Promise<User> {
    const getEmailOrUser = await this.userRepo.findOne({
      attributes: ['username', 'email', 'id'],
      where: { username },
    });
    this.winstonLogger.debug('Find Email Or Username');

    return getEmailOrUser;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
