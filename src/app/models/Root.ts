import { list, object, serializable } from 'serializr'
import { Likemark } from './Likemark'

export class Root {
  @serializable
  name: String = 'Likemarks'

  @serializable(list(object(Likemark)))
    bookmarks: Likemark[] = []
}
