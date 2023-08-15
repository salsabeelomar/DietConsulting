import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './model/answer.model';
import { Providers } from 'src/common/constant/providers.constant';
import { WinstonLogger } from 'src/common/logger/winston.logger';
import { CheckExisting } from 'src/common/utils/checkExisting';

@Injectable()
export class AnswerService {
  private readonly winstonLogger = new WinstonLogger();
  constructor(
    @Inject(Providers.ANSWER_PROVIDER)
    private readonly answerRepo: typeof Answer,
  ) {}

  async creationAnswer(
    createAnswer: CreateAnswerInput,
    userId: number,
    transaction: Transaction,
  ) {
    const createDraft = await this.answerRepo.create(
      {
        ...createAnswer,
        userId,
        createdAt: userId,
      },
      {
        transaction,
      },
    );
    this.winstonLogger.log(
      `Answer Created Successfully to Question ${createAnswer.questionId} By User ${userId}`,
    );
    return createDraft.toJSON();
  }

  async create(
    createAnswer: CreateAnswerInput,
    userId: number,
    transaction: Transaction,
  ) {
    if (createAnswer.isDraft) {
      const checkDraft = await this.checkDraftExisting(
        createAnswer.questionId,
        userId,
      );
      CheckExisting(Boolean(checkDraft.isDraft), BadRequestException, {
        msg: 'You already have Draft',
        trace: 'AnswerService.create',
      });
    }
    const createDraft = await this.answerRepo.create(
      {
        ...createAnswer,
        recommendations: JSON.stringify(createAnswer.recommendations),
        userId,
        createdBy: userId,
      },
      {
        transaction,
      },
    );
    this.winstonLogger.log(
      `Answer Created Successfully to Question ${createAnswer.questionId} By User ${userId}`,
    );
    return createDraft.toJSON();
  }

  async findAllUserAnswer(userId: number, transaction: Transaction) {
    const userAnswers = await this.answerRepo.findAll({
      where: {
        userId,
        isDraft: false,
      },
      transaction,
    });
    this.winstonLogger.log(`Get All User Answer`);

    return userAnswers;
  }
  async update(
    userId: number,
    updateAnswer: UpdateAnswerInput,
    transaction: Transaction,
  ) {
    const updatedAnswer = await this.answerRepo.update(
      {
        ...updateAnswer,
        updatedBy: userId,
      },
      {
        where: {
          id: updateAnswer.id,
        },
        transaction,
      },
    );
    CheckExisting(updatedAnswer[0], BadRequestException, {
      msg: 'Answer Failed to Update',
      trace: 'AnswerService.update',
    });
    this.winstonLogger.log(`Update Answer Successfully`);
    return `Answer  with id = ${updateAnswer.id} Updates Successfully`;
  }

  async remove(answerId: number, userId: number, transaction: Transaction) {
    const checkDraft = await this.findById(answerId, userId);

    CheckExisting(checkDraft?.id, BadRequestException, {
      msg: "You Don't have Answer",
      trace: 'AnswerService.remove',
    });
    const deletedAnswer = await this.answerRepo.update(
      {
        deletedAt: new Date(),
        deletedBy: userId,
      },
      {
        transaction,
        where: {
          userId,
          id: answerId,
        },
      },
    );
    CheckExisting(deletedAnswer[0], BadRequestException, {
      msg: 'Answer Failed to Update',
      trace: 'AnswerService.update',
    });
    this.winstonLogger.log(`delete Answer Successfully`);
    return `Answer  with id = ${answerId} Deleted Successfully`;
  }

  async checkDraftExisting(questionId: number, userId: number) {
    const getDraft = await this.answerRepo.findOne({
      attributes: ['isDraft', 'id'],
      where: {
        questionId,
        userId,
      },
    });

    this.winstonLogger.debug(
      `Check QuestionId=${questionId} and userID=${userId} has Draft`,
    );
    return getDraft;
  }
  async findById(id: number, userId: number) {
    const getDraft = await this.answerRepo.findOne({
      attributes: ['isDraft', 'id'],
      where: {
        id,
        userId,
      },
    });

    this.winstonLogger.debug(
      `Check Answer=${id} and userID=${userId}`,
    );
    return getDraft;
  }
}
