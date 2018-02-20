// Module dependencies.
import { connection } from '../config/database'
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, HasOne } from 'sequelize-typescript'
import { list, object, alias, serializable } from 'serializr'

// Entity Table Model.
@Table({
  tableName: 'Likemark',
  timestamps: false,
  paranoid: false
})
export class Likemark extends Model<Likemark> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: false
  })
  id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  parentId: number

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  @serializable(alias('title'))
  name: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  @serializable
  url: string

  @serializable(list(object(Likemark)))
  children: Array<Likemark> = []

  @serializable
  get isFolder (): boolean {
    return this.children.length > 0 ? true : false
  }
}

// Add model to Sequelize instance.
connection.addModels([Likemark])
console.log('Likemark model is ready!')
