// Module dependencies.
import { connection } from '../config/database'
import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, HasOne } from 'sequelize-typescript'
import { list, object, alias, identifier, serializable } from 'serializr'

// Entity Table Model.
@Table({
  tableName: 'Likemark',
  timestamps: false,
  paranoid: false
})
export class Likemark extends Model<Likemark> {
  @PrimaryKey
  @Column({
    type: DataType.TEXT,
    primaryKey: true,
    autoIncrement: false
  })
  @serializable(identifier())
  id: String

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  @serializable
  parentId: String

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  @serializable
  title: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  @serializable
  url: string

  @serializable(list(object(Likemark)))
  children: Likemark[] = []

  @serializable
  get isFolder (): boolean {
    return this.children.length > 0
  }
}

// Add model to Sequelize instance.
connection.addModels([Likemark])
console.log('Likemark model is ready!')
