/* eslint-disable no-console, arrow-body-style */
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const http = require('axios')

const exec = cmd => {
  return new Promise((resolve, reject) => {
    return childProcess.exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err)

      return resolve(stdout || stderr)
    })
  })
}

const API = process.env.CDE_API
const KEY = process.env.API_KEY
const url = `${API}/agencies?fields=agency_name,ori,primary_county,agency_type_name,icpsr_lat,icpsr_lng,months_reported,nibrs_months_reported,past_10_years_reported,state_abbr,submitting_name&per_page=25000&api_key=${KEY}`

// const agencies = require('./agencies.json')
const outDir = path.join(__dirname, '../../public/data/')

console.log('updating agencies data from api')
http
  .get(url)
  .then(res => res.data)
  .then(agencies => {
    const names = agencies.results
      .map(agency => ({
        key: agency.ori,
        value: agency.agency_name,
      }))
      .reduce((accum, next) => {
        return Object.assign({}, accum, {
          [next.key]: next.value,
        })
      }, {})

    const outFile = path.join(outDir, 'agencies-names-by-state.json')
    fs.writeFile(outFile, JSON.stringify(names), err => {
      if (err) throw err
    })

    return agencies
  })
  .then(agencies => {
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

    const outFile = path.join(outDir, 'agencies-by-state.json')
    fs.writeFile(outFile, JSON.stringify(usStates), err => {
      if (err) throw err

      exec(`rm -f ${outFile}.gz && gzip ${outFile}`).then(() => {
        console.log('done!')

        Object.keys(usStates).sort((a, b) => a - b).forEach(state => {
          const agenciesCount = Object.keys(usStates[state]).length
          console.log(`${state} has ${agenciesCount} agencies`)
        })
      })
    })
  })
  .catch(err => {
    console.log('eek, an error', err)
  })
