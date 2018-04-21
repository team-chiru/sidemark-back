import { Root } from '../models/Root'
import * as netscapeParse from 'bookmarks-parser'
import { serialize, deserialize } from 'serializr'
import * as Mustache from 'mustache'
import { TreeManager } from './TreeManager'
import { IdMethod, IdFactory } from './IdFactory'
import * as PromiseLike from 'bluebird'

import * as fs from 'fs'
import { Likemark } from '../models/Likemark'

export class NetscapeAdapter {
  static export (): PromiseLike<String> {
    const path = process.env.TEMPLATES_PATH

    const templates = {
      root: fs.readFileSync(path + 'Root.mustache', 'utf8'),
      likemark: fs.readFileSync(path + '/Likemark.mustache', 'utf8')
    }

    return TreeManager.get().then(
      root => Mustache.render(templates.root, serialize(root), {
        Likemark: templates.likemark
      })
    )
  }

  static import (html: String, factory?: IdFactory): PromiseLike<Likemark[]> {
    const idFactory = factory || new IdFactory(IdMethod.UUID)

    return new PromiseLike((resolve, reject) => {
      netscapeParse(html, (err, json) => {
        if (err) {
          reject(err)
        }

        const root = deserialize(Root, json)

        // netscape serializer add a root bookmark called Menu
        if (root.bookmarks.length === 1 && root.bookmarks[0].title === 'Menu') {
          root.bookmarks = root.bookmarks[0].children
        }

        NetscapeAdapter.updateIds(root, idFactory)

        TreeManager.merge(root).then(
          likemarks => resolve(likemarks)
        ).catch(err => reject(err))
      })
    })
  }

  private static updateIds (root: Root, idFactory: IdFactory) {
    const update = like => {
      like.id = idFactory.create(like)

      like.children.forEach(
        child => {
          child.parentId = like.id
          update(child)
        }
      )
    }

    root.bookmarks.forEach(
      bookmark => {
        bookmark.parentId = 'root'
        bookmark.id = 'root'

        update(bookmark)
      }
    )
  }
}
