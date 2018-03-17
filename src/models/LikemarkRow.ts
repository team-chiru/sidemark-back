// Module dependencies.
import { connection } from '../config/database'
import { Likemark } from './Likemark'
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, HasOne } from 'sequelize-typescript'

// Entity Table Model.
@Table({
  tableName: 'Likemark',
  timestamps: false,
  paranoid: false
})
export class LikemarkRow extends Model<LikemarkRow> {
  @PrimaryKey
  @Column({
    type: DataType.TEXT,
    primaryKey: true,
    autoIncrement: false
  })
  id: String

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  parentId: String

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  title: String

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  url: String
}
