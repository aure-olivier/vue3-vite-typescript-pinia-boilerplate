# api.io

## Prerequisites

* Have node `v20.11.0` installed.
* Create a [.env](./.env) file with this content (replaced by your env value):

``` text
JIRA_API_URL=<FILL_ME_JIRA_SERVER_URL>
JIRA_USERNAME=<FILL_ME_JIRA_USERNAME>
JIRA_API_TOKEN=<FILL_ME_JIRA_TOKEN>
```

## Scripts

``` bash
# Installs dependencies (required before developing)
npm install
# Runs the server in development mode
npm run dev
# Builds the server for production
npm run build
# Launches unit-tests
npm run test
# Checks codebase quality
npm run lint
```
