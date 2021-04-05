NestJS backend with user registration and login handling using JWT tokens. Ready to deploy to Heroku.

Build step will create ormconfig from environment variables (DATABASE_URL) or default config which will be used to connect to a database.

## Installation

```bash
$ npm install
```

### Database

Project includes `docker-compose` for starting postgres container for easier start. Navigate to `postgres` folder and start the container with

```bash
docker-compose up -d
```

Database is run on post 5433 as opposed to default postgres port of 5432. Run the database migrations before trying to start up the app.

### Database migrations

Run database migrations with

```bash
npm run migrations:run
```

Add new DB migrations with

```bash
npm run typeorm:addmigration "your-migration-name"
```

Check [TypeORM website](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md) for further info

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

## API documentation

### Register

#### POST /users

```javascript
{
	"email": strin
	"name": string,
	"password": string
}
```

#### POST /auth/login

```javascript
{
	"email": strin
	"password": string
}
```

Response includes generated JWT token

#### GET /users/profile

Add login (JWT) token to auth headers (`token`)
Response includes profile information.

#### POST /messages

```javascript
{
	"receiverId": int
	"message": string
}
```

Add login (JWT) token to auth headers (`token`). Send message to user identified by `receiverId`.
