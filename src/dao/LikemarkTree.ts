import { Likemark } from '../models/Likemark'
import * as PromiseLike from 'bluebird'
import { Root } from '../models/Root'
import * as uuidv4 from 'uuid/v4'
import { serialize } from 'serializr'

export class LikemarkTree {
  static get (): PromiseLike<Root> {
    return Likemark.findAll<Likemark>().then(LikemarkTree.sort)
  }

  static sort (all: Likemark[]) {
    let root = new Root()

    all.forEach((node) => {
      if (node.parentId === '-1') {
        root.bookmarks.push(node)
      } else {
        let parent = all.find(el => el.id === node.parentId)

        if (parent) {
          parent.children.push(node)
        } else {
          throw new Error('No parent is found')
        }
      }
    })

    return root
  }

  static create (root: Root): PromiseLike<Likemark[]> {
    let buffer: Likemark[] = []

    const buildLikemark = (like: Likemark) => {
      like.id = uuidv4()

      like.children.forEach(
        (child) => {
          child.parentId = like.id
        }
      )

      buffer.push(like)

      like.children.forEach(buildLikemark)
    }

    root.bookmarks.forEach(
      (bookmark: Likemark) => {
        bookmark.parentId = '0' // TODO
        buildLikemark(bookmark)
      })

    return PromiseLike.all(buffer.map(
      (like) => {
        const raw = serialize(like)

        return Likemark.create<Likemark>(raw)
      }
    ))
  }
}
