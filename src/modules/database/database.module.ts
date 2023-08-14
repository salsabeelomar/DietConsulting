import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { DATABASE } from 'src/common/constant/database.constant';

@Module({
  providers: databaseProvider,
  exports: [...databaseProvider, DATABASE.DATABASE_PROVIDE],
})
export class DatabaseModule {}
