/**
 * Module dependencies.
 */
import * as Sequelize from 'sequelize'
import { Entity as entityModel } from '../models/entity'

export const get = (req, res: any) => {
  entityModel.findAll()
  .then(
    (entities) => {
      return res.status(200).json({
        success: true,
        message: entities
      })
    },
    (_err) => {
      return res.status(400).json({
        success: false,
        message: _err.message
      })
    })
}

export const external = (req, res: any) => {
  return res.status(200).json({
    success: true,
    message: 'First external file api call is successful!'
    // token: token
  })
}

export const post = (req, res: any) => {
  return res.status(200).json({
    success: true,
    message: 'First post call is successful!'
    // token: token
  })
}
