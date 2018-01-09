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
The start script start server on port 42506 that can be change in the file /.env root project directory.

```
npm start
```

### Branch Structure
master
dev

### Unit tests

To run the test, a database.db file must be initialized by the script.
`simple_entity.sql`

The database must be create in the `/src/app` folder.
So, run those command to create the database:

```
cd src/app
sqlite3 database.db < sql/simple_entity.sql
```
run this command to start unit test:

```
npm run test
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

Get a single likemark by id with his first level of children
```
/likemark/getWithFirstChildren/:id
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



