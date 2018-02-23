import { Likemark } from '../models/Likemark'
import * as PromiseLike from 'bluebird'
import { Root } from '../models/Root'

export class ModelBuilder {
  static fetchRoot (): PromiseLike<Root> {
    return Likemark.findAll<Likemark>().then(
      (all) => {
        let builder = new ModelBuilder()
        return builder.buildTree(all)
      }
    )
  }

  static createTree (root: Root) {
    return Promise.resolve(false)
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
