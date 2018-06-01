import { NetscapeAdapter } from '../logic/NetscapeAdapter'
import { Request, Response } from 'express'

export class Netscape {
  public static import (req: any, res: Response) {
    req.pipe(req.busboy)

    req.busboy.on('file', function (fieldname, fs, filename) {
      let html = ''

      fs.on('data', function (data) {
        html += data
      })

      fs.on('end', function () {
        NetscapeAdapter.import(html).then(result => {
          if (!result) {
            throw new Error('There is no imported likemarks')
          }

          res.status(201).json({
            success: true,
            message: result
          })
        })
        .catch(err => res.status(500).json({
          success: false,
          message: err.message
        }))
      })
    })
  }

  public static export (req: Request, res: Response) {
    NetscapeAdapter.export().then((html) => {
      res.status(200)
        .attachment('likemark.html')
        .end(html)
    })
    .catch(err => res.status(500).json({
      success: false,
      message: err.message
    }))
  }
}
