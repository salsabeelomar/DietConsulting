import { Providers } from 'src/common/constant/providers.constant';
import { User } from './model/user.model';

export const userProvider = {
  provide: Providers.USER_PROVIDER,
  useValue: User,
};
