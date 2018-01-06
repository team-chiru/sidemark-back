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

// Get a Likemark into table Likemark.
test('Test Likemark: Get alikemark.', done => {
  let isGet: boolean = false
  Likemark.findOne<Likemark>({
    where: {
      id: likemarkTest.id
    }
  })
  .then(
    (likemark) => {
      if (!(likemark === null)) {
        isGet = true
      }
      expect(isGet).toBe(true)
      done()
    },
    (_err) => {
      fail()
    })
})

// Create a Likemark into table Likemark.
// test('Test Likemark: Post to create likemark.', async done => {
//   let isCreated: boolean = false
//   let likemark = await likemarkModel.create(likemarkTest)
//   console.log(likemark)
// })
