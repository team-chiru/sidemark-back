import { list, object, alias, identifier, serializable } from 'serializr'
import { LikemarkRow } from './LikemarkRow'

export class Likemark {
  @serializable(identifier())
  id: String

  @serializable
  parentId: String = '0' // default parentId is flat

  @serializable
  title: String

  @serializable
  url: String

  @serializable(list(object(Likemark)))
  children: Likemark[] = []

  @serializable
  get isFolder (): boolean {
    return this.children.length > 0
  }

  static fromRow (raw: LikemarkRow): Likemark {
    let likemark = new Likemark()

    likemark.id = raw.id
    likemark.parentId = raw.parentId
    likemark.title = raw.title
    likemark.url = raw.url

    return likemark
  }
}
