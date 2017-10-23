import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'

const nationalKey = 'united-states'

const lookupStateByName = (stateData, name) => {
  if (!stateData) return null

  for (var data in stateData) {
    if (stateData[data].state_name === startCase(name)) {
        return stateData[data]
    }
  }

  if(stateData === 'usa') {
    return nationalKey;
  }

  return null;
}

const lookupRegionByName = (regionData, name) => {
  if (!regionData) return null

  for (var data in regionData) {
    if (lowerCase(regionData[data].region_name) === name) {
        return regionData[data]
    }
  }

  return null;
}
const stateFromAbbr = (stateData, abbr) => {
  return stateData.find(d => d.state_abbr === abbr.toLowerCase());
}

const stateFromName = (stateData, name) => {
  return stateData.find(d => d.state_name === name.toLowerCase());
}

const lookupStatesByRegion = (stateData, regioncode) => {
  let states = [];
  for (var data in stateData) {
    if (stateData[data].region_code === regioncode) {
        states.push(stateData[data]);
    }
  }
  return states;
}

export { lookupStateByName, lookupRegionByName, stateFromAbbr, lookupStatesByRegion, stateFromName }
