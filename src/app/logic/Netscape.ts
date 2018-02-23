import { Root } from '../models/Root'
import * as netscapeParse from 'bookmarks-parser'
import { serialize, deserialize } from 'serializr'
import * as Mustache from 'mustache'
import { Builder } from '../logic/Builder'
import * as PromiseLike from 'bluebird'

import * as fs from 'fs'
import { Likemark } from '../models/Likemark'

export class Netscape {
  static export (): PromiseLike<String> {
    const path = process.env.TEMPLATES_PATH

    const templates = {
      root: fs.readFileSync(path + 'Root.mustache', 'utf8'),
      likemark: fs.readFileSync(path + '/Likemark.mustache', 'utf8')
    }

    return Builder.fetchRoot().then(
      (root) => {
        return Mustache.render(templates.root, serialize(root), {
          Likemark: templates.likemark
        })
      }
    )
  }

  static import (html: String): PromiseLike<Likemark[]> {
    return new PromiseLike(
      (resolve, reject) => {
        netscapeParse(html, (err, json) => {
          if (err) {
            reject(err)
          }

          const root = deserialize(Root, json)

          Builder.createTree(root).then(
            (likemarks) => {
              resolve(likemarks)
            }
          ).catch(
            (err) => {
              reject(err)
            }
          )
        })
      }
    )
  }
}
