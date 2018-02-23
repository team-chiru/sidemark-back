import { Root } from '../models/Root'
import * as netscapeParse from 'bookmarks-parser'
import { serialize, deserialize } from 'serializr'
import * as Mustache from 'mustache'
import * as fs from 'fs'

export class Netscape {
  public export (root: Root): String {
    const path = process.env.TEMPLATES_PATH
    const templates = {
      root: fs.readFileSync(path + 'Root.mustache', 'utf8'),
      likemark: fs.readFileSync(path + '/Likemark.mustache', 'utf8')
    }

    return Mustache.render(templates.root, serialize(root), {
      Likemark: templates.likemark
    })
  }

  public import (html: String): Promise<Root> {
    return new Promise(
      (resolve, reject) => {
        netscapeParse(html, (err, json) => {
          if (err) {
            reject(err)
          }

          resolve(deserialize(Root, json))
        })
      }
    )
  }
}
