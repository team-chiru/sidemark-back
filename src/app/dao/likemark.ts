/**
 * Module dependencies.
 */
import { Likemark } from '../models/Likemark'
import { Root } from '../models/Root'
import { Request, Response } from 'express'
import * as netscapeParse from 'bookmarks-parser'

import { serialize, deserialize } from 'serializr'

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

  public getFirstChildren (req: Request, res: Response) {
    const id: number = req.params.id
    Likemark.findAll<Likemark>({
      where: {
        parentId: id
      }
    })
    .then(
      (children) => {
        return res.status(200).json({
          success: true,
          message: children
        })
      },
      (_err) => {
        return res.status(400).json({
          success: false,
          message: _err.message
        })
      })
  }

  public getWithFirstChildren (req: Request, res: Response) {
    const id: number = req.params.id
    Likemark.findOne<Likemark>({
      where: {
        id: id
      }
    })
    .then(
      (likemark) => {
        Likemark.findAll<Likemark>({
          where: {
            parentId: id
          }
        })
        .then(
          (children) => {
            let likemarkWithChild
            if (likemark) {
              likemarkWithChild = likemark
              likemarkWithChild.dataValues['children'] = children
            }
            return res.status(200).json({
              success: true,
              message: likemarkWithChild
            })
          },
          (_err) => {
            return res.status(400).json({
              success: false,
              message: _err.message
            })
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
        } else {
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

  public remove (req: Request, res: Response) {
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
        } else {
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

  import (req: any, res: Response) {
    req.pipe(req.busboy)
    req.busboy.on('file', function (fieldname, fs, filename) {
      let html = ''

      fs.on('data', function (data) {
        html += data
      })

      fs.on('end', function () {
        netscapeParse(html, function (err, json) {
          if (err) {
            console.log(err)
          }

          // console.log(res.parser);
          const root = deserialize(Root, json)
          console.log(root)
        })
      })

    })
  }
}
