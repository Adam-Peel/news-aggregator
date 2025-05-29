# News Aggregator setup

## Necessary environment variables

This repo will require creation of two environment variables:

1. '.env.development'
2. '.env.test'

These can either be automated by running `'npm run setup-env"` in the terminal, or created manually and populated as follows:

### .env.development

`PGDATABASE=nc_news`

### .env.test

`PGDATABASE=nc_news_test`
