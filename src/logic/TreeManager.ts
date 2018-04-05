import { Likemark } from '../models/Likemark'
import { LikemarkRow } from '../models/LikemarkRow'
import * as PromiseLike from 'bluebird'
import { Root } from '../models/Root'
import { serialize } from 'serializr'

export class TreeManager {
  static get (): PromiseLike<Root> {
    return LikemarkRow.findAll<LikemarkRow>().then(
      all => this.sort(
        all.map(
          likemark => Likemark.fromRow(likemark.get())
        )
      )
    )
  }

  static merge (root: Root): PromiseLike<Likemark[]> {
    let buffer: Likemark[] = []

    const collect = like => {
      buffer.push(like)

      like.children.forEach(collect)
    }

    root.bookmarks.forEach(collect)

    return LikemarkRow.bulkCreate<LikemarkRow>(buffer).then(
      rows => rows.map(row => Likemark.fromRow(row))
    )
  }

  private static sort (all: Likemark[]) {
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
}
