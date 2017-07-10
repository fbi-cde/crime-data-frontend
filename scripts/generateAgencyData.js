/* eslint-disable no-console, arrow-body-style */
import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'

import http from 'axios'

const API = process.env.CDE_API
const KEY = process.env.API_KEY
const url = `${API}/agencies?fields=agency_name,ori,primary_county,agency_type_name,icpsr_lat,icpsr_lng,months_reported,nibrs_months_reported,past_10_years_reported,state_abbr,submitting_name&per_page=25000&api_key=${KEY}`
const outFile = path.join(__dirname, '../public/data/agencies-by-state.json')

const exec = cmd => {
  return new Promise((resolve, reject) => {
    return childProcess.exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err)
      return resolve(stdout || stderr)
    })
  })
}

http
  .get(url)
  .then(res => res.data)
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
  .catch(err => console.log('eek, an error', err))
