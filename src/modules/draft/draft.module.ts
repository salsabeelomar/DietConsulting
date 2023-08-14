import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftResolver } from './draft.resolver';

@Module({
  providers: [DraftResolver, DraftService],
})
export class DraftModule {}
