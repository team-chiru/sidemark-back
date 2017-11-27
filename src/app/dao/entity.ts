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
    const uuId: number = req.params.uuId
    Entity.findOne<Entity>({
      where: {
        uuId: uuId
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

  public getFirstChild (req: Request, res: Response) {
    const uuId: number = req.params.uuId
    Entity.findAll<Entity>({
      where: {
        parentId: uuId
      }
    })
    .then(
      (childrens) => {
        return res.status(200).json({
          success: true,
          message: childrens
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
    const uuId: number = req.params.uuId
    const entity: Object = req.body

    Entity.update<Entity>( entity, {
      where: {
        uuId: uuId
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
            message: 'There is no entity associated to this uuId.'
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
    const uuId: number = req.params.uuId
    Entity.destroy({
      where: {
        uuId: uuId
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
            message: 'There is no entity associated to this uuId.'
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
