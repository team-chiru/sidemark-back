# Likemark-backend-ts
### Installing and Script

```
npm install --save https://github.com/mapbox/node-sqlite3/tarball/master
```

```
npm install
```

```
npm run lint
```

### @types for Sequelize-TypeScript
If you have error with linter with sequelize-typescript, you need to copy paste from node_modules the folder sequelize-typescript into the folder node_modules/@types to not have ts compiler problems in vscode.  

### Development


the start script start server on port 42506 that can be change in the file /.env root project directory.

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

### API routes

#### GET
Get a single entity by the id.
```
/entity/get/:id
```

Get the first level of children of an entity by id.
```
/entity/getFirstChild/:id
```

List all entity in the database.
```
/entity/list
```

#### POST
Create a single entity.
```
/entity/post
```

#### PATCH
Update an entity by id.
```
/entity/update/:id
```

#### DELETE
Delete an entity by id.
```
/entity/delete/:id
```



