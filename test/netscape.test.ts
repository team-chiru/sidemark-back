import { serialize, deserialize } from 'serializr'
import * as Mustache from 'mustache'
import { Sequelize } from 'sequelize-typescript'
import * as fs from 'fs'

import { connection } from './database'
import { Netscape } from '../src/logic/Netscape'
import { Likemark } from '../src/models/Likemark'
import { LikemarkRow } from '../src/models/LikemarkRow'
import { LikemarkTree } from '../src/dao/LikemarkTree'
import { Root } from '../src/models/Root'

const sample = deserialize(Root, {
  name: 'Likemarks',
  bookmarks: [{
    id: '0',
    parentId: '-1',
    title: 'Folder0',
    url: null,
    children: [{
      id: '1',
      parentId: '0',
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
      parentId: '0',
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
      parentId: '0',
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
  return LikemarkRow.destroy({
    where: {}
  }).then(() => {
    console.log('Connection has been successfully cleared.')
  })
})

test('Test Tree Fetching', () => {
  return LikemarkRow.findAll<LikemarkRow>().then(
    // expect empty db
    empty => expect(empty).toEqual([])
  ).then(
    // create initial set
    () => LikemarkTree.create(sample)
  ).then(
    // fetch all the tree
    () => LikemarkTree.get()
  ).then(
    root => expect(root).toEqual(sample)
  )
})

test('Test Export: Export a simple likemark object', () => {
  const expected = fs.readFileSync('test/netscape.html', 'utf8')

  return LikemarkRow.findAll<LikemarkRow>().then(
    // expect empty db
    empty => expect(empty).toEqual([])
  ).then(
    // create initial set
    () => LikemarkTree.create(sample)
  ).then(
    // export the initialized db
    () => Netscape.export()
  ).then(
    exported => expect(exported).toBe(expected)
  )
})

test('Test Import: Import a simple likemark object', () => {
  const toImport = fs.readFileSync('test/netscape.html', 'utf8')
  const expected = [
    {id: '0', parentId: '-1', title: 'Folder0', url: null},
    {id: '1', parentId: '0', title: 'Folder1', url: null},
    {id: '11', parentId: '1', title: 'Folder11', url: 'http://likemark.io'},
    {id: '12', parentId: '1', title: 'Link12', url: 'http://likemark.io'},
    {id: '2', parentId: '0', title: 'Folder2', url: null},
    {id: '21', parentId: '2', title: 'Folder21', url: 'http://likemark.io'},
    {id: '22', parentId: '2', title: 'Folder22', url: 'http://likemark.io'},
    {id: '23', parentId: '2', title: 'Folder23', url: null},
    {id: '231', parentId: '23', title: 'Folder231', url: 'http://likemark.io'},
    {id: '3', parentId: '0', title: 'Link3', url: 'http://likemark.io'}
  ]

  // expect empty db
  return LikemarkRow.findAll<LikemarkRow>().then(
    empty => expect(empty).toEqual([])
  ).then(
     // import the initalized db
     () => Netscape.import(toImport)
  ).then(() => {
    // fetch all imported likemark
    return LikemarkRow.findAll<LikemarkRow>({ attributes: ['title', 'url'] ,raw: true}).then(
      likemarks => likemarks.forEach((likemark, index) => {
        if (index === 0) {
          expect(likemark.title).toBe('Menu')
        } else {
          expect([likemark.title, likemark.url]).toMatchObject([expected[index - 1].title, expected[index - 1].url])
        }
      })
    )
  })
})
