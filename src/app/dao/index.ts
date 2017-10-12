/**
 * Module dependencies.
 */
import * as Sequelize from 'sequelize'
import * as DBHelper from '../models/DBModel'

export const api = (req, res: any) => {
  return res.status(200).json({
    success: true,
    message: 'First api call is successful!'
    // token: token
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
