/* eslint-disable no-console, arrow-body-style */
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const exec = cmd => {
  return new Promise((resolve, reject) => {
    return childProcess.exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err)

      return resolve(stdout || stderr)
    })
  })
}

/*
data downloaded from:

https://crime-data-api.fr.cloud.gov/agencies ?fields=agency_name,ori,primary_county,agency_type_name,icpsr_lat,icpsr_lng,months_reported,nibrs_months_reported,past_10_years_reported,state_abbr,submitting_name&per_page=25000&api_key=API_KEY
*/

const agencies = require('./agencies.json')

const outFile = path.join(__dirname, '../../public/data/agencies-by-state.json')
const usStates = {}

agencies.results.forEach(agency => {
  const {
    agency_name,
    agency_type_name,
    icpsr_lat,
    icpsr_lng,
    months_reported,
    nibrs_months_reported,
    ori,
    past_10_years_reported,
    primary_county,
    state_abbr,
  } = agency

  if (!usStates[state_abbr]) usStates[state_abbr] = {}
  usStates[state_abbr][ori] = {
    agency_name,
    agency_type_name,
    icpsr_lat,
    icpsr_lng,
    months_reported,
    nibrs_months_reported,
    past_10_years_reported,
    primary_county,
  }
})

const onWriteDone = err => {
  if (err) throw err

  exec(`rm -f ${outFile}.gz && gzip ${outFile}`).then(() => {
    console.log('done!')

    Object.keys(usStates).sort((a, b) => a - b).forEach(state => {
      const agenciesCount = Object.keys(usStates[state]).length
      console.log(`${state} has ${agenciesCount} agencies`)
    })
  })
}

fs.writeFile(outFile, JSON.stringify(usStates), onWriteDone)
