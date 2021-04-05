## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## DB migrations

Run database migrations with

```bash
npm run migrations:run
```

Add new DB migrations with

```bash
npm run typeorm:addmigration "your-migration-name"
```

Check [TypeORM website](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md) for further info
