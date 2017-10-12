# Likemark-backend-ts
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

### Branch Structure
master
dev

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
`
