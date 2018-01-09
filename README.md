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

Testing with Jest. If you want create a test create a file in the folder __test__ .

test file example

```javascript
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

function sum (a: number, b: number) {
  return a + b
}

To run the test, you need to run this command:
```
npm run test
`

To run the test, a database.db file must be initialized by the script.
`simple_entity.sql`

The database must be create in the `/src/app` folder.
So, run those command to create the database:

```
cd src/app
sqlite3 database.db < sql/simple_entity.sql
```

### API routes

#### GET
Get a single likemark by the id.
```
/likemark/get/:id
```

Get the first level of children of an likemark by id.
```
/likemark/getFirstChildren/:id
```

List all likemark in the database.
```
/likemark/list
```

#### POST
Create a single likemark.
```
/likemark/post
```

#### PATCH
Update an likemark by id.
```
/likemark/update/:id
```

#### DELETE
Delete an likemark by id.
```
/likemark/delete/:id
```



