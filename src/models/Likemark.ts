import { list, object, alias, identifier, serializable } from 'serializr'
import { Row } from './Row'

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

  static fromRow (row: Row): Likemark {
    let likemark = new Likemark()

    likemark.id = row.id
    likemark.parentId = row.parentId
    likemark.title = row.title
    likemark.url = row.url

    return likemark
  }

  static clone (likemark: Likemark): Likemark {
    let clone = new Likemark()

    clone.id = likemark.id
    clone.parentId = likemark.parentId
    clone.title = likemark.title
    clone.url = likemark.url
    clone.children = likemark.children

    return clone
  }
}
