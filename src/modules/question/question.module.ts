import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { questionProvider } from './question.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [QuestionResolver, QuestionService, questionProvider],
})
export class QuestionModule {}
