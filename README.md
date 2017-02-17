# Crime Data Explorer

[![Build status on CircleCI](https://circleci.com/gh/18F/crime-data-explorer/tree/master.svg?style=svg)](https://circleci.com/gh/18F/crime-data-explorer/tree/master) [![Code Climate GPA](https://codeclimate.com/github/18F/crime-data-explorer/badges/gpa.svg)](https://codeclimate.com/github/18F/crime-data-explorer) [![Dependency Status](https://gemnasium.com/badges/github.com/18F/crime-data-explorer.svg)](https://gemnasium.com/github.com/18F/crime-data-explorer)


This project is the front end for the Crime Data Explorer, using data from [18f/crime-data-api](https://github.com/18f/crime-data-api). The Crime Data Explorer is a website that allows law enforcement and the general public to more easily access uniform crime data. The FBI collects this data from state and local law enforcement agencies and publishes it in the form of annual reports.  


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

This project is [continuously deployed](circle.yml) to [cloud.gov](https://cloud.gov) with every commit to the `master` branch. Right now, you can use the application at https://crime-data-explorer.fr.cloud.gov.

### For user testing

We have `manifest-demo.yml` for deploying any given branch/commit to another environment for conducting user testing. From your local machine, use the following command:

`cf push -f manifest-demo.yml`

The user testing app is available at https://crime-data-explorer-demo.fr.cloud.gov.

## Browser support

For the MVP launch of this project (Spring 2017) we will explicitly support Chrome, Safari, IE 10+, Firefox and MS Edge.
