import {
  Model,
  Table,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Question } from 'src/modules/question/model/question.model';
import { User } from 'src/modules/user/model/user.model';

@Table({
  tableName: 'answers',
})
export class Answer extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  recommendations: string[];

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isDraft: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number;

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

  @BelongsTo(() => Question)
  question: Question;

}
