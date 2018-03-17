/**
 * Module dependencies.
 */
import { LikemarkRow } from '../models/LikemarkRow'
import { Likemark } from '../models/Likemark'
import { Root } from '../models/Root'
import { Netscape } from '../logic/Netscape'
import { Request, Response } from 'express'
import * as fs from 'memfs'

export class LikemarkAPI {
  public likemarkModel

  public get (req: Request, res: Response) {
    const id: number = req.params.id

    LikemarkRow.findOne<LikemarkRow>({
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

  public getFirstChildren (req: Request, res: Response) {
    const id: number = req.params.id

    LikemarkRow.findAll<LikemarkRow>({
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

  public getWithFirstChildren (req: Request, res: Response) {
    const id: number = req.params.id
    let likemarkWithChild: Likemark

    LikemarkRow.findOne<LikemarkRow>({
      where: { id: id }
    })
    .then(likemark => {
      if (!likemark) {
        throw new Error('GetWithFirstChildren returns an empty likemark')
      }

      likemarkWithChild = Likemark.fromRow(likemark)

      return LikemarkRow.findAll<LikemarkRow>({
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

  public list (req: Request, res: Response) {
    LikemarkRow.findAll<LikemarkRow>()
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

  public post (req: Request, res: Response) {
    const likemark: any = req.body

    LikemarkRow.create<LikemarkRow>(likemark)
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

  public update (req: Request, res: Response) {
    const id: number = req.params.id
    const likemark: Object = req.body

    LikemarkRow.update<LikemarkRow>(likemark, {
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

  public remove (req: Request, res: Response) {
    const id: number = req.params.id
    LikemarkRow.destroy({
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

  public import (req: any, res: Response) {
    req.pipe(req.busboy)

    req.busboy.on('file', function (fieldname, fs, filename) {
      let html = ''

      fs.on('data', function (data) {
        html += data
      })

      fs.on('end', function () {
        Netscape.import(html).then(result => {
          if (!result) {
            throw new Error('There is no imported likemarks')
          }

          res.status(201).json({
            success: true,
            message: result
          })
        })
        .catch(err => res.status(400).json({
          success: false,
          message: err.message
        }))
      })
    })
  }

  public export (req: Request, res: Response) {
    Netscape.export().then((html) => {
      res.status(200)
        .attachment('likemark.html')
        .end(html)
    })
    .catch(err => res.status(400).json({
      success: false,
      message: err.message
    }))
  }
}
