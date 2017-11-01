// Module dependencies.
import * as Sequelize from 'sequelize'
import { connection } from '../config/database'

export const Entity = connection.define('Entity', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: true },
  url: { type: Sequelize.STRING, allowNull: true }
}, {
  tableName: 'Entity',
  timestamps: false,
  paranoid: false
  // createdAt: 'CreatedAt',
  // updatedAt: 'UpdatedAt'
})

console.log('Entity model is ready!')
