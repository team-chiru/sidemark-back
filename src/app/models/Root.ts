import { list, object, serializable } from 'serializr'

class Likemark {
  @serializable
  name: String

  @serializable(list(object(Likemark)))
  children: Likemark[] = []

  @serializable
  get isFolder (): boolean {
    return this.children.length > 0 ? true : false
  }
}

export class Root {
  @serializable
  name: String = 'Likemarks'

  @serializable(list(object(Likemark)))
  likemarks: Likemark[] = []
}
