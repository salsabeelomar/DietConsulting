import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { DatabaseModule } from '../database/database.module';
import { answerProvider } from './answer.provider';

@Module({
  imports: [DatabaseModule],
  providers: [AnswerResolver, AnswerService, answerProvider],
})
export class AnswerModule {}
