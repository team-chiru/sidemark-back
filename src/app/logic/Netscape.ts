import { Root } from '../models/Root'
import { serialize } from 'serializr'
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
}
