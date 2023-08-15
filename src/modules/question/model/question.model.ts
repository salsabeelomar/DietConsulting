import {
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Table,
} from 'sequelize-typescript';

import { Answer } from 'src/modules/answer/model/answer.model';
import { User } from 'src/modules/user/model/user.model';

@Table({
  tableName: 'questions',
})
export class Question extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  deletedBy: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  updatedBy: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  createdBy: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Answer)
  answers: Answer[];
}
