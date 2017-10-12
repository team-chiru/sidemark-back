# Typescript-starter-backend
This is a typescript template for backend
git: https://github.com/Tower450/typescript-starter-backend.git

## Techs used

⋅⋅* nodejs written in TypeScript
⋅⋅* Standard JS coding standard enforced with Ts lint


### Installing and Script

```
npm install

```

```
npm run lint

```


### Development


the start script start server on port 49101 that can be change in the file /.env root project directory.

```
npm start

```

the start script can be change to ts-node but in dev keep it ts-node-dev.

### Branch Structure

master is production branch. develop is stable branch. Feature branches are checkedout from develop and merged only after a code review.
Feature branches will be deleted after being merged

### Unit tests

testing with Jest. to create a test create a file in the folder __test__ .

test file example

```javascript
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

function sum (a: number, b: number) {
  return a + b
}
```
then run the test. the script will pick up all tests

```
npm test
```
# likemark-backend-ts
