/**
 * Module dependencies.
 */
import * as Sequelize from 'sequelize'
import { Entity as entityModel } from '../models/entity'
import { Request, Response } from '../../../node_modules/@types/express/index'

export class EntityDAO {
  private entityModel: any

  constructor () {
    this.entityModel = entityModel
  }

  public get = (req: Request, res: Response) => {
    const id: number = req.params.id
    entityModel.findOne({
      where: {
        id: id
      }
    })
    .then(
      (entity) => {
        return res.status(200).json({
          success: true,
          message: entity
        })
      },
      (_err) => {
        return res.status(400).json({
          success: false,
          message: _err.message
        })
      })
  }

  public list = (req: Request, res: Response) => {
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

  public post = (req: Request, res: Response) => {
    const entity: any = req.body
    console.log(req.body)
    entityModel.create(entity)
    .then(
      (entity) => {
        return res.status(201).json({
          success: true,
          message: entity
        })
      },
      (_err) => {
        return res.status(400).json({
          success: false,
          message: _err
        })
      })
  }

  public update = (req: Request, res: Response) => {
    const id: number = req.params.id
    const entity: Object = req.body

    entityModel.update( entity, {
      where: {
        id: id
      }
    })
    .then(
      (site) => {
        return res.status(201).json({
          success: true,
          message: req.body
        })
      },
      (_err) => {
        return res.status(400).json({
          success: false,
          message: _err
        })
      })
  }

  public remove = (req, res: any) => {
    const id: number = req.params.id
    entityModel.destroy({
      where: {
        id: id
      }
    })
    .then(
      (entity) => {
        return res.status(200).json({
          success: true,
          message: entity
        })
      },
      (_err) => {
        return res.status(400).json({
          success: false,
          message: _err.message
        })
      })
  }
}
