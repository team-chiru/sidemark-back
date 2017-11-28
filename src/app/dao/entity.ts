/**
 * Module dependencies.
 */
import { Likemark } from '../models/entity'
import { Request, Response } from 'express'

export class LikemarkDAO {
  public likemarkModel

  constructor () {
    this.likemarkModel = Likemark
  }

  public get (req: Request, res: Response) {
    const id: number = req.params.id
    Likemark.findOne<Likemark>({
      where: {
        id: id
      }
    })
    .then(
      (likemark) => {
        return res.status(200).json({
          success: true,
          message: likemark
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
    const id: number = req.params.id
    Likemark.findAll<Likemark>({
      where: {
        parentId: id
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
    Likemark.findAll<Likemark>()
    .then(
      (likemarks) => {
        return res.status(200).json({
          success: true,
          message: likemarks
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
    const likemark: any = req.body
    Likemark.create<Likemark>(likemark)
    .then(
      (likemark) => {
        return res.status(201).json({
          success: true,
          message: likemark
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
    const likemark: Object = req.body

    Likemark.update<Likemark>( likemark, {
      where: {
        id: id
      }
    })
    .then(
      (likemark) => {
        if (likemark[0] === 1 ) {
          return res.status(200).json({
            success: true,
            message: likemark
          })
        }else {
          return res.status(400).json({
            success: false,
            message: 'There is no likemark associated to this id.'
          })
        }
      },
      (_err) => {
        return res.status(400).json({
          success: false,
          message: _err
        })
      })
  }

  public remove (req, res: any) {
    const id: number = req.params.id
    Likemark.destroy({
      where: {
        id: id
      }
    })
    .then(
      (likemark) => {
        if (likemark === 1 ) {
          return res.status(200).json({
            success: true,
            message: likemark
          })
        }else {
          return res.status(400).json({
            success: false,
            message: 'There is no likemark associated to this id.'
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
