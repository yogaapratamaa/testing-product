This is SwiftOmsLite base project bootstrapped with [Next.js](https://nextjs.org/).

Demo: [https://swiftomslite.testingnow.me/](https://swiftomslite.testingnow.me/)


## Pre-Installation
### Setup Host and Graphql Endpoint
1. Open file [swift.config.js](swift.config.js)
2. Edit the host of each environment at thes lines:
```
const HOST = {
    local: 'http://localhost:3000'
    dev: '[dev url]',
    stage: '[stage url]',
    prod: '[prod url]',
};
```
3. Edit GraphQl endpoint of each environment at these lines:
```
const graphqlEndpoint = {
    local: '[gql endpoint for local]'
    dev: '[gql endpoint for dev]',
    stage: '[gql endpoint for stage]',
    prod: '[gql endpoint for prod]',
};
```

## Installation
You can run SwiftOmsLite with or without docker.
### Without Docker
#### Dev mode
1. Build static assets (do once only for the first time)
```
npm run assets:build
# or
yarn assets:build
```
2. Run it (sample for local environment):
```bash
npm run local
# or
yarn local
``` 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:bulb: Please find more commands for another environments in [package.json](package.json)  

3. Open [http://localhost:3000](http://localhost:3000) on browser to see the frontend.

#### Prod mode
1. Build the static assets and the project
```bash
npm run build
# or
yarn build
```
2. Run it (sample for local environment):
```bash
npm run local:start
# or
yarn local:start
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:bulb: Please find more commands for another environments in [package.json](package.json)  

3. Open [http://localhost:3000](http://localhost:3000) on browser to see the frontend.

### With Docker
#### Local environment (dev mode): 
1. build: `docker-compose -f ./docker/local/docker-compose.yml build`
2. run: `docker-compose -f ./docker/local/docker-compose.yml up`


Alternatively, build and run in one step: `docker-compose -f ./docker/local/docker-compose.yml up --build`


#### Dev environment (prod mode): 
1. build: `docker-compose -f ./docker/dev/docker-compose.yml build`
2. run: `docker-compose -f ./docker/dev/docker-compose.yml up`

Alternatively, build and run in one step: `docker-compose -f ./docker/dev/docker-compose.yml up --build`

#### Prod environment (prod mode):
1. build: `docker-compose build`
2. run: `docker-composer up`

Alternatively, build and run in one step: `docker-compose up --build`

## The SwiftOmsLite Cores
### Modules
Click [here](core/modules/readme.md) for more detail.
### Helpers
Click [here](core/helpers/readme.md) for more detail.
### Libraries
Click [here](core/lib/readme.md) for more detail.
### Public
Click [here](core/public/readme.md) for more detail.

# Overriding
Do not ever touch files under under [core](core) folder!
Do override in [src](src) folder instead!
