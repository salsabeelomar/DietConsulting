import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';
import { userProvider } from './user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, userProvider],
})
export class UserModule {}
