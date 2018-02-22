import { serialize, deserialize } from 'serializr'
import * as Mustache from 'mustache'
import { Netscape } from '../src/app/logic/Netscape'
import { ModelBuilder } from '../src/app/logic/ModelBuilder'
import * as fs from 'fs'

test('Test Export: Export a simple likemark object', () => {
  const expected = fs.readFileSync('test/export.html', 'utf8')
  const netscape = new Netscape()

  ModelBuilder.fetchRoot().then(
    root => expect(netscape.export(root)).toBe(expected)
  )
})
