import { Entity } from '../src/app/models/entity'
import { EntityDAO } from '../src/app/dao/entity'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

function sum (a: number, b: number) {
  return a + b
}
it('works with async/await', async () => {
    //
})
