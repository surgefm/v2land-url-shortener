# v2land-url-shortener
URL Shortener developed for v2land community.

## Installation

It requires a latest Node.JS LTS.

### Install dependencies

```bash
$ yarn
```

### Install package for your selected database dialect

```bash
$ yarn add pg pg-hstore // Postgresql
$ yarn add mysql2 // MySQL
$ yarn add sqlite3 // SQLite
$ yarn add tedious // MSSQL
```

## Usage

It provides several commands.

- `yarn build`: build TypeScript files into JavaScript
- `yarn start`: build and start server
- `yarn watch-server`: monitor file changes and restart once changed
- `yarn lint`: lint using eslint and tslint
- `yarn fix`: fix all auto-fixable mistakes
- `yarn test`: test using mocha


## Stack

- Koa
- Sequelize
- SQLite (dev)
- Postgresql

## APIs
- /api/new