import { serialize, deserialize } from 'serializr'
import * as Mustache from 'mustache'
import { Root } from '../../src/app/models/Root'
import * as fs from 'fs'
import * as pretty from 'pretty'

const simple = {
  id: 31,
  parentId: 3,
  name: 'test',
  url: 'www.test.com'
}

test('Test Export: Export a simple likemark object', () => {
  const test = {
    name: 'Test',
    url: 'www.test.com',
    bookmarks: [{
      name: 'L1',
      url: 'www.test.com',
      children: [{
        name: 'L11',
        url: 'www.test.com',
      }]
    }, {
      name: 'L2'
    }]
  }

  const root = deserialize(Root, test)
  const json = serialize(root)

  console.log(json)

  const rootTemplate = fs.readFileSync('src/app/logic/Root.mustache', 'utf8')
  const likemarkTemplate = fs.readFileSync('src/app/logic/Likemark.mustache', 'utf8')

  const result = Mustache.render(rootTemplate, json, {
    Likemark: likemarkTemplate
  })

  console.log(result)
})
