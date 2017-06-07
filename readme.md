# company-info-service

This service handles calling out to Companies House to fetch public information about a company.

## Setup

Please update the `config.companiesHouse.apiKey` value in the respective envrionment config files under `src/config` with your Companies House API key.

If you wish to use the built-in Rollbar error reporting, please also update the `config.rollbar.token` value in `src/config/common.ts`.

## Building Image

```
> make build
```

## Running Locally

```
> npm install
> npm run dev
```

The server listens on port `3000`.

## API Design

Please refer to the Swagger documentation at `/documentation` to explore the API design.