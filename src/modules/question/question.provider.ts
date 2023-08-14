import { Providers } from 'src/common/constant/providers.constant';
import { Question } from './model/question.model';

export const questionProvider = {
  provide: Providers.QUESTION_PROVIDER,
  useValue: Question,
};
