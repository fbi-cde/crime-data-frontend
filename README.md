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

### Running tests

You can lint the code with `npm run lint` and run tests with `npm run test`.

## Deployment

### `master` branch

This project is [continuously deployed](circle.yml) to [cloud.gov](https://cloud.gov) with every commit to the `master` branch. Right now, you can use the application at https://crime-data-explorer.fr.cloud.gov.

### Stable

Tagged releases are deployed to https://crime-data-explorer-demo.fr.cloud.gov.

### Staging

A third, and less formal, environment is available at https://crime-data-explorer-staging.fr.cloud.gov. This is for ad-hoc usage and testing.

Use `cf push -f manifest/staging.yml` to deploy. Remember that `cf` pushes from your local file structure and won't build the app on its own, so make sure you run `npm run build` before pushing.

## Release process

This app follows [semver](http://semver.org/) and has [tagged releases](https://github.com/18F/crime-data-explorer/releases) by version number. You can see all notable changes in [CHANGELOG.md](https://github.com/18F/crime-data-explorer/blob/master/CHANGELOG.md).

### Manual verification

Though unit test coverage is decent (check with `npm run coverage`, as of [`cdb2340`](https://github.com/18F/crime-data-explorer/commit/cdb2340830b0325dc9a05ba443a1a84c2e835430) it was about 77% of all statements), we run through a few basic user scenarios before tagging a release to check the application.

1. Load homepage from `master` branch. Can be local or https://crime-data-explorer.fr.cloud.gov
2. Select "Explorer" from navigation
3. Ensure that a trend chart renders to show "Violent Crime rate in United States"
4. Select "Alabama" as the location in the left hand side menu
5. Select "Robbery" as the crime in the left hand side menu
6. Ensure that the URL is now `/explorer/alabama/robbery`
7. Ensure that a trend chart renders to show "Robbery rate in Alabama, 2004–2014"
8. Scroll down and ensure donut charts, histograms, and tables render to show "Robbery incident details in Alabama, 2004–2014"
9. Scroll down and ensure there is a section called "About the data"
10. Select "Downloads & Documentation" from the navigation at the top of the page or the footer at the bottom
11. Select "Alabama" as the "Location" and "2000" as the "Year". Click download and ensure that a `.zip` file is downloaded
12. Click the "Download data" link for "Hate crime" under "Bulk downloads" and ensure a file called `hate_crime.csv` is downloaded

### Tagging a release

1. Compile the notable changes into the [CHANGELOG.md](https://github.com/18F/crime-data-explorer/blob/master/CHANGELOG.md). You can use the `/compare/:lastVersion...master` endpoint on Github. For example, this [`/compare` link was used to determine the changes in `v1.1.0`](https://github.com/18F/crime-data-explorer/compare/v1.0.0...33edf933009664a74e2601aa369f4bb6a67394c5)
2. Determine if the version should be increased by a major, minor, or patch version
3. Adjust the version number in `package.json` accordingly
4. Submit a pull request without tagging the commit
5. Once the pull request is merged, tag the merge commit as `vX.Y.Z` where `X`, `Y`, and `Z` reflect the same version number as the now merged change for `package.json`
6. Push the tag to Github with `git push origin vX.Y.Z`

## Browser support

For the MVP launch of this project (Spring 2017), we’ll explicitly support Chrome, Safari, IE 10+, Firefox, and MS Edge.
