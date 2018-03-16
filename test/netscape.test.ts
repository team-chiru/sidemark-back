import { serialize, deserialize } from 'serializr'
import * as Mustache from 'mustache'
import { Sequelize } from 'sequelize-typescript'
import * as fs from 'fs'

import { connection } from './database'
import { Netscape } from '../src/logic/Netscape'
import { Likemark } from '../src/models/Likemark'

const tests = [
  {id: '0', parentId: '-1', title: 'Folder1', url: 'http://likemark.io'},
  {id: '1', parentId: '0', title: 'Folder1', url: 'http://likemark.io'},
  {id: '11', parentId: '1', title: 'Folder11', url: 'http://likemark.io'},
  {id: '12', parentId: '1', title: 'Link12', url: 'http://likemark.io'},
  {id: '2', parentId: '0', title: 'Folder2', url: 'http://likemark.io'},
  {id: '21', parentId: '2', title: 'Folder21', url: 'http://likemark.io'},
  {id: '22', parentId: '2', title: 'Folder22', url: 'http://likemark.io'},
  {id: '23', parentId: '2', title: 'Folder23', url: 'http://likemark.io'},
  {id: '231', parentId: '23', title: 'Folder231', url: 'http://likemark.io'},
  {id: '3', parentId: '0', title: 'Link3', url: 'http://likemark.io'}
]

// Test database connection and set server
beforeAll(() => {
  return connection.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  }).catch(err => {
    console.error('Unable to connect to the database:', err)
  })
})

test('Test Export: Export a simple likemark object', () => {
  const netscape = new Netscape()
  const expected = fs.readFileSync('test/netscape.html', 'utf8')

  Likemark.bulkCreate<Likemark>(tests).then(
    () => Netscape.export()
  ).then(
    exported => expect(exported).toBe(expected)
  )
})