/**
 * Module dependencies.
 */
import { Row } from '../models/Row'
import { Likemark } from '../models/Likemark'
import { Root } from '../models/Root'
import { Request, Response } from 'express'
import * as fs from 'memfs'

export class Dao {
  public static get (req: Request, res: Response) {
    const id: number = req.params.id

    Row.findOne<Row>({
      where: { id: id }
    })
    .then(likemark => {
      if (!likemark) {
        throw new Error('Get returns an empty row')
      }

      res.status(200).json({
        success: true,
        message: Likemark.fromRow(likemark)
      })
    })
    .catch(err => res.status(400).json({
      success: false,
      message: err.message
    }))
  }

  public static getFirstChildren (req: Request, res: Response) {
    const id: number = req.params.id

    Row.findAll<Row>({
      where: { parentId: id }
    })
    .then(children => res.status(200).json({
      success: true,
      message: children.map(
        child => Likemark.fromRow(child)
      )
    }))
    .catch(err => res.status(400).json({
      success: false,
      message: err.message
    }))
  }

  public static getWithFirstChildren (req: Request, res: Response) {
    const id: number = req.params.id
    let likemarkWithChild: Likemark

    Row.findOne<Row>({
      where: { id: id }
    })
    .then(likemark => {
      if (!likemark) {
        throw new Error('GetWithFirstChildren returns an empty likemark')
      }

      likemarkWithChild = Likemark.fromRow(likemark)

      return Row.findAll<Row>({
        where: { parentId: id }
      })
    })
    .then(children => {
      likemarkWithChild.children = children.map(
        row => Likemark.fromRow(row)
      )

      res.status(200).json({
        success: true,
        message: likemarkWithChild
      })
    })
    .catch(err => res.status(400).json({
      success: false,
      message: err.message
    }))
  }

  public static list (req: Request, res: Response) {
    Row.findAll<Row>()
    .then(likemarks => res.status(200).json({
      success: true,
      message: likemarks.map(
        row => Likemark.fromRow(row)
      )
    }))
    .catch(err => res.status(400).json({
      success: false,
      message: err.message
    }))
  }

  public static post (req: Request, res: Response) {
    const likemark: any = req.body

    Row.create<Row>(likemark)
    .then(likemark => {
      if (!likemark) {
        throw new Error('Post returns an empty likemark')
      }

      res.status(201).json({
        success: true
      })
    })
    .catch(err => res.status(400).json({
      success: false,
      message: err.message
    }))
  }

  public static update (req: Request, res: Response) {
    const id: number = req.params.id
    const likemark: Object = req.body

    Row.update<Row>(likemark, {
      where: { id: id }
    })
    .then(likemark => {
      if (likemark[0] !== 1 ) {
        throw new Error('There is no likemark associated to this id')
      }

      res.status(200).json({
        success: true,
        message: likemark
      })
    })
    .catch(err => res.status(400).json({
      success: false,
      message: err
    }))
  }

  public static remove (req: Request, res: Response) {
    const id: number = req.params.id
    Row.destroy({
      where: { id: id }
    })
    .then(isDestroyed => {
      if (isDestroyed !== 1 ) {
        throw new Error('There is no likemark associated to this id')
      }

      res.status(200).json({
        success: true
      })
    })
    .catch(err => res.status(400).json({
      success: false,
      message: err.message
    }))
  }
}
