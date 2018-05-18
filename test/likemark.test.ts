import { connection } from './database'
import { Row } from '../src/models/Row'

// Likemark that we use for test
const likemarkTest = {
  id: '1',
  parentId: '1',
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
  return Row.create<Row>(likemarkTest)
  .then((likemark) => {
    console.log('Likemark test created before each test.')
  })
}, 1000)

afterEach(() => {
  return Row.destroy({
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
    parentId: '1',
    title: 'test',
    url: 'www.test.com'
  }

  return Row.create<Row>(likemarkExpected).then(
      created => expect(created.get({plain: true})).toMatchObject(likemarkExpected)
  )
})

// Get a likemark from Likemark table
test('Test Likemark: Get a likemark.', () => {
  return Row.findOne<Row>({
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
    parentId: '1',
    title: 'test-updated',
    url: 'www.test-updated.com'
  }
  return Row.update<Row>(likemarkExpected, {
    where: {
      id: likemarkTest.id
    }
  })
  .then((likemark) => {
    return Row.findOne<Row>({
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
  return Row.destroy({
    where: {
      id: likemarkTest.id
    }
  })
  .then((likemark) => {
    return Row.findOne<Row>({
      where: {
        id: likemarkTest.id
      }
    }).then(likemark => {
      expect(likemark).toBe(null)
    })
  })
})
