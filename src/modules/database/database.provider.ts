import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { DATABASE } from 'src/common/constant/database.constant';
import { User } from '../user/model/user.model';
import { Question } from '../question/model/question.model';
import { Answer } from '../answer/model/answer.model';
import { Draft } from '../draft/model/draft.model';

export const databaseProvider = [
  {
    provide: DATABASE.DATABASE_PROVIDE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get('database'),
        define: {
          underscored: true,
          paranoid: true,
        },
      });

      sequelize.addModels([User, Question, Answer, Draft]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
