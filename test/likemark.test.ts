import { connection } from './database'
import { LikemarkRow } from '../src/models/LikemarkRow'

// Likemark that we use for test
const likemarkTest = {
  id: '1',
  parentId: '0',
  title: 'test',
  url: 'www.test.com'
}

// Test database connection and set server
beforeAll(() => {
  return connection.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
})

// Set a default likemark into the memory database
beforeEach(() => {
  return LikemarkRow.create<LikemarkRow>(likemarkTest)
  .then((likemark) => {
    console.log('Likemark test created before each test.')
  })
}, 1000)

afterEach(() => {
  return LikemarkRow.destroy({
    where: {}
  }).then(() => {
    console.log('Connection has been successfully cleared.')
  })
}, 1000)

afterAll(() => {
  return connection.close()
})

// Create a likemark into table Likemark
test('Test Likemark: Post to create likemark.', () => {
  const likemarkExpected = {
    id: '2',
    parentId: '0',
    title: 'test',
    url: 'www.test.com'
  }

  return LikemarkRow.create<LikemarkRow>(likemarkExpected).then(
      created => expect(created.get({plain: true})).toMatchObject(likemarkExpected)
  )
})

// Get a likemark from Likemark table
test('Test Likemark: Get a likemark.', () => {
  return LikemarkRow.findOne<LikemarkRow>({
    where: {
      id: likemarkTest.id
    }
  }).then(likemark => {
    expect(likemark.get({plain: true})).toMatchObject(likemarkTest)
  })
})

// Update an existing likemark from the Likemark table.
test('Test Likemark: Update a likemark.', () => {
  const likemarkExpected = {
    id: '1',
    parentId: '0',
    title: 'test-updated',
    url: 'www.test-updated.com'
  }
  return LikemarkRow.update<LikemarkRow>(likemarkExpected, {
    where: {
      id: likemarkTest.id
    }
  })
  .then((likemark) => {
    return LikemarkRow.findOne<LikemarkRow>({
      where: {
        id: likemarkTest.id
      }
    }).then(likemark => {
      expect(likemark.get({plain: true})).toMatchObject(likemarkExpected)
    })
  })
})

// Delete a likemark from the Likemark table
test('Test Likemark: Delete a likemark.', () => {
  return LikemarkRow.destroy({
    where: {
      id: likemarkTest.id
    }
  })
  .then((likemark) => {
    return LikemarkRow.findOne<LikemarkRow>({
      where: {
        id: likemarkTest.id
      }
    }).then(likemark => {
      expect(likemark).toBe(null)
    })
  })
})
