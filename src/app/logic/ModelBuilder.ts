import { Likemark } from '../models/Likemark'
import * as PromiseLike from 'bluebird'
import { Root } from '../models/Root'
import * as uuidv4 from 'uuid/v4'
import { serialize } from 'serializr'

export class ModelBuilder {
  buffer: Likemark[] = []

  static fetchRoot (): PromiseLike<Root> {
    return Likemark.findAll<Likemark>().then(
      (all) => {
        let builder = new ModelBuilder()
        return builder.buildTree(all)
      }
    )
  }

  static createLikemark (like: Likemark, buffer: Likemark[]) {
    like.id = uuidv4()

    like.children.forEach(
      (child) => {
        child.parentId = like.id
      }
    )

    buffer.push(like)
  }

  static createTree (root: Root) {
    let buffer: Likemark[] = []

    const buildLikemark = (node: Likemark) => {
      ModelBuilder.createLikemark(node, buffer)
      node.children.forEach(buildLikemark)
    }

    root.bookmarks.forEach(
      (bookmark: Likemark) => {
        bookmark.parentId = '0'
        buildLikemark(bookmark)
      })

    PromiseLike.all(buffer.map(
      (like) => {
        const raw = serialize(like)

        return Likemark.create<Likemark>(raw).then(
          (likemark) => {
            console.log(likemark)
          },
          (_err) => {
            console.log(_err)
          })
      }
    ))
  }

  private buildTree (bookmarks): Root {
    let root = new Root()

    bookmarks.forEach((node) => {
      if (node.parentId === -1) {
        root.bookmarks.push(node)
      } else {
        let parent = bookmarks.find(el => el.id === node.parentId)

        if (parent) {
          parent.children.push(node)
        } else {
          throw new Error('No parent is found')
        }
      }
    })

    return root
  }
}
