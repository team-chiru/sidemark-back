/**
 * Module dependencies.
 */
import { Entity } from '../models/entity'
import { Request, Response } from 'express'

export class EntityDAO {
  public entityModel

  constructor () {
    this.entityModel = Entity
  }

  public get (req: Request, res: Response) {
    const id: number = req.params.id
    Entity.findOne<Entity>({
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

  public list (req: Request, res: Response) {
    Entity.findAll<Entity>()
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

  public post (req: Request, res: Response) {
    const entity: any = req.body
    Entity.create<Entity>(entity)
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
          message: _err.message
        })
      })
  }

  public update (req: Request, res: Response) {
    const id: number = req.params.id
    const entity: Object = req.body

    Entity.update<Entity>( entity, {
      where: {
        id: id
      }
    })
    .then(
      (entity) => {
        if (entity[0] === 1 ) {
          return res.status(200).json({
            success: true,
            message: entity
          })
        }else {
          return res.status(400).json({
            success: false,
            message: 'There is no entity associated to this id.'
          })
        }
      },
      (_err) => {
        return res.status(400).json({
          success: false,
          message: _err.message
        })
      })
  }

  public remove (req, res: any) {
    const id: number = req.params.id
    Entity.destroy({
      where: {
        id: id
      }
    })
    .then(
      (entity) => {
        if (entity === 1 ) {
          return res.status(200).json({
            success: true,
            message: entity
          })
        }else {
          return res.status(400).json({
            success: false,
            message: 'There is no entity associated to this id.'
          })
        }
      },
      (_err) => {
        return res.status(400).json({
          success: false,
          message: _err.message
        })
      })
  }
}
