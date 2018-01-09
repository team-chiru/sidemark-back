import { connection as connection } from '../src/app/config/database'
import { Likemark } from '../src/app/models/likemark'

// Test database connection and set server
connection
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.')
})
.catch(err => {
  console.error('Unable to connect to the database:', err)
})

// Likemark that we use for test.
const likemarkTest = {
  id: 31,
  parentId: 3,
  name: 'test',
  url: 'www.test.com'
}

// Create a likemark into table Likemark.
test('Test Likemark: Post to create likemark.', async done => {
  let isCreated: boolean = false
  Likemark.create<Likemark>(likemarkTest)
    .then(
      (likemark) => {
        isCreated = true
        expect(isCreated).toBe(true)
        done()
      },
      (_err) => {
        fail()
      })
})

// Get a likemark from Likemark table.
test('Test Likemark: Get a likemark.', done => {
  let isGet: boolean = false
  Likemark.findOne<Likemark>({
    where: {
      id: likemarkTest.id
    }
  })
  .then(
    (likemark) => {
      if (likemark) {
        isGet = true
      }
      expect(isGet).toBe(true)
      done()
    },
    (_err) => {
      fail()
    })
})

// Update an existing likemark from the Likemark table.
test('Test Likemark: Update a likemark.', done => {
  let isUpdated: boolean = false
  const newLikeMark = {
    parentId: 3,
    name: 'test-updated',
    url: 'www.test-updated.com'
  }
  Likemark.update<Likemark>( newLikeMark, {
    where: {
      id: likemarkTest.id
    }
  })
  .then(
    (likemark) => {
      if (likemark[0] === 1 ) {
        isUpdated = true
      }else {
        fail()
      }
      expect(isUpdated).toBe(true)
      done()
    },
    (_err) => {
      fail()
    })
})

// Delete a likemark from the Likemark table.
test('Test Likemark: Delete a likemark.', done => {
  let isDeleted: boolean = false
  Likemark.destroy({
    where: {
      id: likemarkTest.id
    }
  })
  .then(
    (likemark) => {
      if (likemark === 1 ) {
        isDeleted = true
      }else {
        fail()
      }
      expect(isDeleted).toBe(true)
      done()
    },
    (_err) => {
      fail()
    })
})
