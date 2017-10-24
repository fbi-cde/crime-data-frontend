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

const lookupStateByAbbr = (stateData, abbr) => {
  if (!stateData) return null

  for (var data in stateData) {
    if (stateData[data].state_abbr === abbr) {
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

const lookupRegionByCode = (regionData, code) => {
  console.log(regionData,code)
  if (!regionData) return null

  for (var data in regionData) {
    if (regionData[data].region_code === code) {
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

const isValidRegion = (regionData, name) => {
  if (lookupRegionByName(regionData, name)) {
    return true;
  }
  return false;
}

const isValidState = (stateData, name) => {
  if (lookupStateByName(stateData, name)) {
    return true;
  }
  return false;
}
export { lookupStateByName, lookupRegionByName, stateFromAbbr, lookupStatesByRegion, stateFromName, isValidState, isValidRegion, lookupStateByAbbr, lookupRegionByCode }
