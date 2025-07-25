# News Aggregator setup

This repo contains all scripts and data necessary to serve an api of a mock-up of a basic news-based site where users can post, and interact with, articles.

The current live api server and documentation can be found at: https://www.adampeel.co.uk/api

All available APIs are currently unrestricted and accessible to all, and a list of endpoints, with information about what can be accessed, and how is available in documentation on the hosted site.

# Local hosting

## Local hosting - Necessary repo set up

### Cloning:

To set up and use this repository locally you are welcome to clone the whole repo.

### Local set up:

Once cloned, run `npm install` and ensure that the following packages are dependencies:

{
"express": "^5.1.0",

"dotenv": "^16.5.0",

"nodemon": "^3.1.10",

"pg": "^8.16.0",

"pg-format": "^1.0.4"
},

Run using the following:

| **Engine** | **Version** |
| ---------- | ----------- |
| Node.js    | V22.15.0    |
| PostgreSQL | V16.9       |

We will also require the creation of two environment variables:

1. '.env.development'
2. '.env.test'

These can either be automated by running the following command from the terminal whilst in the repo root directory:

```
npm run setup-env
```

Or, to create the files manually, name and populated as follows:

Name: .env.development

Content: `PGDATABASE=nc_news`

Name: .env.test

Content: `PGDATABASE=nc_news_test`

## Database set up:

Once the repo is set up, with dependencies and environment variables, the database can be created using the following terminal command from the root folder:

```
npm run setup-dbs
```

This creates the necessary database, which will then require seeding using the following command from the root folder:

```
npm run seed-dev
```

### Testing

> To note: This seeds the database with the full set of 'development data'.
> When altering code, the repo is set to test the functionality with a smaller dataset.
> Jest automatically seeds the database with **test** data, before each test is ran.
> Therefore, if you wish to amend any data for local testing purposes please do so using the data in the directory ./db/data/test-data

## Progress Status

As the repo is currently a work in progress, regular checks for commits and / or pull requests should be made before any major revisions to the codebase.

The current live api server and documentation can be found at: https://www.adampeel.co.uk/api
