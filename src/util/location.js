import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'

import { slugify } from '../util/text'

const nationalKey = 'united-states'

const lookupStateByName = (stateData, name) => {
  if (!stateData) return null

  for (const data in stateData) {
    if (slugify(lowerCase(stateData[data].state_name)) === slugify(lowerCase(name))) {
        return stateData[data]
    }
  }

  if (stateData === 'usa') {
    return nationalKey;
  }

  return null;
}

const lookupStateByAbbr = (stateData, abbr) => {
  if (!stateData) return null

  for (const data in stateData) {
    if (stateData[data].state_abbr === abbr) {
        return stateData[data]
    }
  }

  if (stateData === 'usa') {
    return nationalKey;
  }

  return null;
}

const lookupRegionByName = (regionData, name) => {
  if (!regionData) return null

  for (const data in regionData) {
    if (lowerCase(regionData[data].region_name) === lowerCase(name) || slugify(lowerCase(regionData[data].region_name)) === lowerCase(name)) {
        return regionData[data]
    }
  }

  return null;
}

const lookupRegionByCode = (regionData, code) => {
  if (!regionData) return null

  for (const data in regionData) {
    if (regionData[data].region_code === code) {
        return regionData[data]
    }
  }

  return null;
}

const stateFromAbbr = (stateData, abbr) => stateData.find(d => d.state_abbr === abbr.toLowerCase())

const stateFromName = (stateData, name) => stateData.find(d => d.state_name === name.toLowerCase())

const lookupStatesByRegion = (stateData, regioncode) => {
  const states = [];
  for (const data in stateData) {
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

const isValidPlaceType = placeType => {
  if (placeType === 'region' || placeType === 'agency' || placeType === 'state' || placeType === 'national') {
    return true;
  }
  return false;
}

const validateFilter = (filters, regionData, stateData) => {
  if (isValidPlaceType(filters.placeType)) {
    if (filters.placeType === 'state') {
      return isValidState(stateData, filters.place)
    } else if (filters.placeType === 'region') {
        return isValidRegion(regionData, filters.place)
    } else if (filters.placeType === 'agency') {
      return true;
    } else if (filters.placeType === 'national') {
      return true;
    }
  }
  return false;
}

const lookupDisplayName = (filters, regionData, stateData) => {
  if (isValidPlaceType(filters.placeType)) {
    if (filters.place === 'united-states') {
      return 'United States'
    }
    if (filters.placeType === 'state') {
      return lookupStateByName(stateData, filters.place).state_name
    } else if (filters.placeType === 'region') {
        return `${lookupRegionByName(regionData, filters.place).region_name} Region`
      }
  }
}

const generateDisplayName = (place, placeType) => {
  if (placeType === 'state') {
    const state = place.replace('-', ' ');
    return startCase(state)
  } else if (placeType === 'region') {
      return `${startCase(place)} Region`;
  }
    return 'United States'
}

const getPlaceId = (filters, regionData, stateData) => {
  if (isValidPlaceType(filters.placeType)) {
    if (filters.placeType === 'state') {
      return lookupStateByName(stateData, filters.place).state_abbr;
    } else if (filters.placeType === 'region') {
        return lookupRegionByName(regionData, filters.place).region_code
    }
  }
}

export { lookupStateByName, lookupRegionByName, lookupStatesByRegion,
  stateFromAbbr, stateFromName, isValidState, isValidRegion, lookupStateByAbbr,
  lookupRegionByCode, validateFilter, lookupDisplayName, generateDisplayName,
  getPlaceId }
