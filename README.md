# Crime Data Explorer

[![Build status on CircleCI](https://circleci.com/gh/18F/crime-data-explorer/tree/master.svg?style=svg)](https://circleci.com/gh/18F/crime-data-explorer/tree/master) [![Code Climate GPA](https://codeclimate.com/github/18F/crime-data-explorer/badges/gpa.svg)](https://codeclimate.com/github/18F/crime-data-explorer) [![Dependency Status](https://gemnasium.com/badges/github.com/18F/crime-data-explorer.svg)](https://gemnasium.com/github.com/18F/crime-data-explorer)

This project is the front end for the Crime Data Explorer, using data from [18f/crime-data-api](https://github.com/18f/crime-data-api). The Crime Data Explorer is a website that allows law enforcement and the general public to more easily access [Uniform Crime Reporting (UCR)](https://ucr.fbi.gov/) data. Over 18,000 city, university and college, county, state, tribal, and federal law enforcement agencies voluntarily report crime data to the program, and the FBI publishes it in [annual reports](https://ucr.fbi.gov/ucr-publications).

## Installation

You will need `node` and `npm` to install and run this project.

1. `git clone git@github.com:18F/crime-data-explorer.git cde && cd cde`
2. `npm install`

### Running the app locally

Make sure to set the `API_KEY` environment variable with your API key for the [Crime Data API](//github.com/18f/crime-data-api). It should be an environment variable so that it doesn't leak to the client side application.

Use `npm run watch` to start the continuous `webpack` processes and a webserver.

## Running tests

You can lint the code with `npm run lint` and run tests with `npm run test`.

## Deployment

### `master` branch

This project is [continuously deployed](circle.yml) to [cloud.gov](https://cloud.gov) with every commit to the `master` branch. Right now, you can use the application at https://crime-data-explorer.fr.cloud.gov.

### Stable

Tagged releases are deployed to https://crime-data-explorer-demo.fr.cloud.gov.

### Staging

A third, and less formal, environment is available at https://crime-data-explorer-staging.fr.cloud.gov. This is for ad-hoc usage and testing.

Use `cf push -f manifest/staging.yml` to deploy. Remember that `cf` pushes from your local file structure and won't build the app on its own, so make sure you run `npm run build` before pushing.

## Browser support

For the MVP launch of this project (Spring 2017), we’ll explicitly support Chrome, Safari, IE 10+, Firefox, and MS Edge.
