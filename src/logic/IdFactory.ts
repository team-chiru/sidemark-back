import * as uuidv4 from 'uuid/v4'
import { Likemark } from '../models/Likemark'

export enum IdMethod { UUID, PARENT_ID, COPY }

export class IdFactory {
  private idMethod: IdMethod
  private parentIdHash: Map<String, number>

  constructor (method?: IdMethod) {
    this.idMethod = method ? method : IdMethod.UUID
    this.parentIdHash = new Map()
  }

  create (like: Likemark): String {
    let newId = ''

    if (like.id === like.parentId) {
      return like.id // never create the root again
    }

    switch (this.idMethod) {
      case IdMethod.PARENT_ID:
        let index = this.parentIdHash.get(like.parentId)

        if (index) {
          index += 1
        } else {
          index = 1
        }

        this.parentIdHash.set(like.parentId, index)

        if (like.parentId === 'root') {
          newId = index.toString()
        } else {
          newId = like.parentId + index.toString()
        }
        break

      case IdMethod.COPY:
        newId = like.id ? like.id : uuidv4()
        break

      default:
        newId = uuidv4()
        break

    }

    return newId
  }
}
