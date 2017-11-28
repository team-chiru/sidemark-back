import { connection as connection } from '../src/app/config/database'
import { Likemark as likemarkModel } from '../src/app/models/likemark'

// Test database connection and set server
connection
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.')
})
.catch(err => {
  console.error('Unable to connect to the database:', err)
})

const likemarkTest = {
  id: 31,
  parentId: 3,
  name: 'test',
  url: 'www.test.com'
}

// Create a Likemark into table Likemark.
test('Test Likemark: Post to create likemark.', async done => {
  let isCreated: boolean = false
  let likemark = await likemarkModel.create(likemarkTest)
  console.log(likemark)
})

it('works with async/await', async () => {
    //
})
