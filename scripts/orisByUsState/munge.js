/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')

// data downloaded from:
//
// https://crime-data-api.fr.cloud.gov/agencies
//    ?fields=agency_name,ori,primary_county,agency_type_name,state_abbr,submitting_name
//    &per_page=25000&api_key=API_KEY
//
const agencies = require('./agencies.json')

const outFile = path.join(__dirname, '../../public/data/agencies-by-state.json')
const usStates = {}

agencies.results.forEach(agency => {
  const {
    agency_name,
    agency_type_name,
    ori,
    primary_county,
    state_abbr,
  } = agency
  const subset = { agency_name, agency_type_name, primary_county }

  if (!usStates[state_abbr]) usStates[state_abbr] = {}
  usStates[state_abbr][ori] = subset
})

const onWriteDone = err => {
  if (err) throw err
  console.log('done!')

  Object.keys(usStates).sort((a, b) => a - b).forEach(state => {
    const agenciesCount = Object.keys(usStates[state]).length
    console.log(`${state} has ${agenciesCount} agencies`)
  })
}

fs.writeFile(outFile, JSON.stringify(usStates), onWriteDone)
