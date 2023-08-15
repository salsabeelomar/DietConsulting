import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { WinstonLogger } from 'src/common/logger/winston.logger';
import { Providers } from 'src/common/constant/providers.constant';
import { Question } from './model/question.model';
import { Transaction } from 'sequelize';
import { CheckExisting } from 'src/common/utils/checkExisting';
import { User } from '../user/model/user.model';
import { LIMIT } from 'src/common/constant/pagginationLimit.constant';
import { Answer } from '../answer/model/answer.model';

@Injectable()
export class QuestionService {
  private readonly winstonLogger = new WinstonLogger();
  constructor(
    @Inject(Providers.QUESTION_PROVIDER)
    private readonly questionRepo: typeof Question,
  ) {}
  async addQuestion(
    question: CreateQuestionInput,
    userId: number,
    transaction: Transaction,
  ) {
    const newQues = await this.questionRepo.create(
      {
        ...question,
        userId: userId,
        createdBy: userId,
      },
      {
        transaction,
      },
    );

    this.winstonLogger.log(` Question Created Successfully ID =${newQues.id}`);
    return newQues.toJSON();
  }

  async findAll(page: number, transaction: Transaction) {
    const offset = (page - 1) * LIMIT;
    const questions = await this.questionRepo.findAll({
      attributes: ['id', 'title', 'description', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: Answer,
          attributes: ['title', 'description', 'recommendations'],
          where: {
            isDraft: false,
          },
        },
      ],
      transaction,
      offset,
      limit: LIMIT,
      order: [['createdAt', 'DESC']],
    });

    this.winstonLogger.log(` Get All Questions Successfully `);

    return questions;
  }

  async getUserQuestions(userId: number) {
    const userQues = await this.questionRepo.findAll({
      attributes: ['id', 'title', 'description'],
      where: {
        userId,
      },
    });
    this.winstonLogger.log(`Get All Question of User With id = ${userId}`);
    return userQues;
  }

  async update(
    updateQuestion: UpdateQuestionInput,
    userId: number,
    transaction: Transaction,
  ) {
    const id = updateQuestion['id'];
    delete updateQuestion['id'];

    const checkQues = await this.checkQuestionExisting(id, userId);

    CheckExisting(checkQues, NotFoundException, {
      msg: 'Question Not Found for Update ',
      trace: 'Question Service.update',
    });

    const updatedQues = await this.questionRepo.update(
      {
        ...updateQuestion,
        updatedBy: userId,
      },
      {
        where: {
          id,
          userId: userId,
        },
        transaction,
      },
    );

    CheckExisting(updatedQues[0], BadRequestException, {
      msg: 'Failed To Update Question',
      trace: 'QuestionService.update',
    });
    this.winstonLogger.log(` Question Updated Successfully ID =${id}`);

    return 'Question Updated Successfully';
  }

  async remove(id: number, userId: number, transaction: Transaction) {
    const checkQues = await this.checkQuestionExisting(id, userId);

    CheckExisting(checkQues, NotFoundException, {
      msg: 'Question Not Found for Remove ',
      trace: 'Question Service.remove',
    });

    const deleteQues = await this.questionRepo.update(
      {
        deletedAt: new Date(),
        deletedBy: userId,
      },
      {
        where: {
          id,
        },
        transaction,
      },
    );
    CheckExisting(deleteQues[0], BadRequestException, {
      msg: 'Failed To Update Question',
      trace: 'QuestionService.remove',
    });
    return `Question with Id ${id} Removes Successfully`;
  }

  async checkQuestionExisting(id: number, userId: number) {
    const getQues = await this.questionRepo.findOne({
      where: {
        id,
        userId: userId,
      },
    });
    this.winstonLogger.log(`Get Question with ID =${id} and UserId=${userId}`);
    return getQues;
  }
}
