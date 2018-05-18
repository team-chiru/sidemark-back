import { serialize, deserialize } from 'serializr'
import * as Mustache from 'mustache'
import { Sequelize } from 'sequelize-typescript'
import * as fs from 'fs'

import { connection } from './database'
import { NetscapeAdapter } from '../src/logic/NetscapeAdapter'
import { IdMethod, IdFactory } from '../src/logic/IdFactory'
import { Likemark } from '../src/models/Likemark'
import { Row } from '../src/models/Row'
import { TreeManager } from '../src/logic/TreeManager'
import { Root } from '../src/models/Root'

const sample = deserialize(Root, {
  name: 'Likemarks',
  bookmarks: [{
    id: 'root',
    parentId: 'root',
    title: 'Folder0',
    url: null,
    children: [{
      id: '1',
      parentId: 'root',
      title: 'Folder1',
      url: null,
      children: [{
        id: '11',
        parentId: '1',
        title: 'Folder11',
        url: 'http://likemark.io'
      }, {
        id: '12',
        parentId: '1',
        title: 'Link12',
        url: 'http://likemark.io'
      }]
    }, {
      id: '2',
      parentId: 'root',
      title: 'Folder2',
      url: null,
      children: [{
        id: '21',
        parentId: '2',
        title: 'Folder21',
        url: 'http://likemark.io'
      }, {
        id: '22',
        parentId: '2',
        title: 'Folder22',
        url: 'http://likemark.io'
      }, {
        id: '23',
        parentId: '2',
        title: 'Folder23',
        url: null,
        children: [{
          id: '231',
          parentId: '23',
          title: 'Folder231',
          url: 'http://likemark.io'
        }]
      }]
    }, {
      id: '3',
      parentId: 'root',
      title: 'Link3',
      url: 'http://likemark.io'
    }]
  }]
})

// Test database connection and set server
beforeEach(() => {
  return connection.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  }).catch(err => {
    console.error('Unable to connect to the database:', err)
  })
})

afterEach(() => {
  return Row.destroy({
    where: {}
  }).then(() => {
    console.log('Connection has been successfully cleared.')
  })
})

test('Test Tree Fetching', () => {
  return Row.findAll<Row>().then(
    empty => expect(empty).toEqual([]) // expect empty db
  ).then(
    () => TreeManager.merge(sample) // create initial set
  ).then(
    () => TreeManager.get() // fetch all the tree
  ).then(
    root => expect(root).toEqual(sample)
  )
})

test('Test Export: Export a simple likemark object', () => {
  const expected = fs.readFileSync('test/netscape.html', 'utf8')

  return Row.findAll<Row>().then(
    empty => expect(empty).toEqual([]) // expect empty db
  ).then(
    () => TreeManager.merge(sample) // create initial set
  ).then(
    () => NetscapeAdapter.export() // export the initialized db
  ).then(
    exported => expect(exported).toBe(expected)
  )
})

test('Test Import: Import a simple likemark object', () => {
  const toImport = fs.readFileSync('test/netscape.html', 'utf8')
  const idFactory = new IdFactory(IdMethod.PARENT_ID)

  return Row.findAll<Row>().then(
    empty => expect(empty).toEqual([]) // expect empty db
  ).then(
     () => NetscapeAdapter.import(toImport, idFactory) // import the initalized db
  ).then(
    () => TreeManager.get() // fetch all imported likemark
  ).then(
    tree => expect(tree).toEqual(sample)
  )
})
