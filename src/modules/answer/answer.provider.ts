import { Providers } from 'src/common/constant/providers.constant';
import { Answer } from './model/answer.model';

export const answerProvider = {
  provide: Providers.ANSWER_PROVIDER,
  useValue: Answer,
};
