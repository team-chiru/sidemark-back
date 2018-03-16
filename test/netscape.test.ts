import { serialize, deserialize } from 'serializr'
import * as Mustache from 'mustache'
import { connection } from './database'
import { Netscape } from '../src/logic/Netscape'
import * as fs from 'fs'

// Test database connection and set server
beforeAll(() => {
  connection.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
})

afterAll(() => {
  connection.close()
})
test('Test Export: Export a simple likemark object', () => {
  const expected = fs.readFileSync('test/export.html', 'utf8')
  const netscape = new Netscape()

  Netscape.export().then(
    exported => expect(exported).toBe(expected)
  )
})

test('Test Export: Export a simple likemark object', () => {
  const expected = fs.readFileSync('test/export.html', 'utf8')
  const netscape = new Netscape()

  Netscape.export().then(
    exported => expect(exported).toBe(expected)
  )
})
