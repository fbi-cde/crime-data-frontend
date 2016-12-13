# Crime Data Explorer

[![build status](https://circleci.com/gh/18F/crime-data-explorer/tree/master.svg?style=svg)](https://circleci.com/gh/18F/crime-data-explorer/tree/master)

This project is the front end for the Crime Data Explorer, using data from [18f/crime-data-api](https://github.com/18f/crime-data-api).

## Installation

You will need `node` and `npm` to install and run this project.

1. `git clone git@github.com:18F/crime-data-explorer.git cde && cd cde`
2. `npm install`

### Running the app locally

Make sure to set the `API_KEY` environment variable with your API key for the [Crime Data API](//github.com/18f/crime-data-api). It should be an environment variable so that it doesn't leak to the client side application.

Use `npm run watch` to start the continuous `webpack` process and a webserver.

## Running tests

You can lint the code with `npm run lint` and run tests with `npm run test`.

## Deployment

This project is [continuously deployed](circle.yml) to [cloud.gov](https://cloud.gov) with every commit to the `master` branch. Until we have an ATO for this project, the deployed app is behind HTTP basic auth.
