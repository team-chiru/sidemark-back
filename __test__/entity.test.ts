import { Entity as entityModel } from './database/model/Entity'

test('First test with bookshelf', () => {
  entityModel.fetchAll()
    .then(function (entity) {
      console.log(entity)
    }).catch(function (_err) {
      console.error(_err)
    })
})
