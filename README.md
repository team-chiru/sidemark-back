# sidemark-back
likemark backend prototype.
## Contribute
### Installing and Script

```
npm install --save https://github.com/mapbox/node-sqlite3/tarball/master
```

```
npm install
```

Run the linter.

```
npm run lint
```

## Development
The start script start server on port 42506 that can be change in the file /.env root project directory.

```
npm start
```

## Initialise Likemark database
If you want to create the database, a `database.db` file must be initialized and a table must be created by the script: `LikemarkTable.sql`

The database must be create in the `/src` folder. So, run those commands to create the database:

```
cd src
sqlite3 database.db < sql/LikemarkTable.sql
```

## Unit tests
The unit test are run with Jest. More details in `package.json` file.

run this command to start unit test:
```
npm run test
```

## API documentation
### GET
Get a single likemark by id.
```
/likemark/get/:id
```

Get the first level of children of an likemark by id.
```
/likemark/getFirstChildren/:id
```

Get a single likemark by id with his first level of children.
```
/likemark/getWithFirstChildren/:id
```

List all likemarks in the database.
```
/likemark/list
```

### POST
Create a single likemark.
```
/likemark/post
```

### PATCH
Update a likemark by id.
```
/likemark/update/:id
```

### DELETE
Delete a likemark by id.
```
/likemark/delete/:id
```



