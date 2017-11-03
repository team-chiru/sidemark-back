// Module dependencies.
import { connection } from '../config/database'
import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

@Table(
  {
    tableName: 'Entity',
    timestamps: false,
    paranoid: false
  }
)
export class Entity extends Model<Entity> {

  @PrimaryKey
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number

  @Column(DataType.TEXT)
  name: string

  @Column(DataType.TEXT)
  url: string

}
// Add model to Sequelize instance
connection.addModels([Entity])
console.log('Entity model is ready!')
