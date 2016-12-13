# Crime Data Explorer

[![build status](https://circleci.com/gh/18F/crime-data-explorer/tree/master.svg?style=svg)](https://circleci.com/gh/18F/crime-data-explorer/tree/master)

This project is the front end for the Crime Data Explorer, using data from [18f/crime-data-api](https://github.com/18f/crime-data-api).

## Installation

You will need `node` and `npm` to install and run this project.

1. `git clone git@github.com:18F/crime-data-explorer.git cde && cd cde`
2. `npm install`
3. `npm run watch`

The `watch` command will start the continuous `webpack` process and a webserver.

## Running tests

You can lint the code with `npm run lint` and run tests with `npm run test`.

## Deployment

This project is [continuously deployed](circle.yml) to [cloud.gov](https://cloud.gov) with every commit to the `master` branch. Until we have an ATO for this project, the deployed app is behind HTTP basic auth.

