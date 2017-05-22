const fs = require('fs')
const path = require('path')

const jsonFile = require('./agencies.json')

const agencies = jsonFile.results
const usStates = {}

agencies.forEach(agency => {
  const stateAbbr = agency.state_abbr

  const smallAgency = {
    agency_name: agency.agency_name,
  }

  if (usStates[stateAbbr]) {
    usStates[stateAbbr][agency.ori] = smallAgency
  } else {
    usStates[stateAbbr] = { [agency.ori]: smallAgency }
  }
})

const onWriteDone = err => {
  if (err) throw err

  console.log('done!')

  Object.keys(usStates).sort((a, b) => a - b).forEach(state => {
    const agenciesCount = Object.keys(usStates[state]).length
    console.log(`${state} has ${agenciesCount} agencies`)
  })
}

const file = path.join(__dirname, '../../data/agencies-by-state.json')

fs.writeFile(file, JSON.stringify(usStates), onWriteDone)
