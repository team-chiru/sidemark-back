// Module dependencies.
import * as Sequelize from 'sequelize'
import { connection } from '../config/database'

export const Entity = connection.define('Entity', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  tree_id: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  url: { type: Sequelize.STRING, allowNull: true },
  struct_type: { type: Sequelize.STRING, allowNull: false },
  fn_type: { type: Sequelize.STRING, allowNull: true },
  rev_no: { type: Sequelize.INTEGER, allowNull: false }
}, {
  tableName: 'Entity',
  timestamps: false,
  paranoid: false
  // createdAt: 'CreatedAt',
  // updatedAt: 'UpdatedAt'
})

console.log('Entity model is ready!')
