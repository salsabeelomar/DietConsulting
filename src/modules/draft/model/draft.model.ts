import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from 'sequelize-typescript';
import { Question } from 'src/modules/question/model/question.model';
import { User } from 'src/modules/user/model/user.model';

@Table({
  tableName: 'drafts',
})
export class Draft extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
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


  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Question)
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false })
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
}
