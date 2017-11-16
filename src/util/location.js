import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'

import { slugify } from '../util/text'

const nationalKey = 'united-states'

const lookupStateByName = (stateData, name) => {
  let n = null;

  if (!stateData) return n

  Object.keys(stateData).forEach(data => {
    if (slugify(lowerCase(stateData[data].state_name)) === slugify(lowerCase(name))) {
        n = stateData[data]
    }
  })

  if (stateData === 'usa') {
    n = nationalKey;
  }

  return n;
}

const lookupStateByAbbr = (stateData, abbr) => {
  let n = null;

  if (!stateData) return n

  Object.keys(stateData).forEach(data => {
    if (stateData[data].state_abbr === abbr) {
        n = stateData[data]
    }
  })

  if (stateData === 'usa') {
    n = nationalKey;
  }

  return n;
}

const lookupRegionByName = (regionData, name) => {
  let n = null;
  if (!regionData) return n

  Object.keys(regionData).forEach(data => {
    if (lowerCase(regionData[data].region_name) === lowerCase(name) || slugify(lowerCase(regionData[data].region_name)) === lowerCase(name)) {
        n = regionData[data]
    }
  })

  return n;
}

const lookupRegionByCode = (regionData, code) => {
  let n = null;
  if (!regionData) return n

  Object.keys(regionData).forEach(data => {
    if (regionData[data].region_code === code) {
        n = regionData[data]
    }
  })

  return n;
}

const stateFromAbbr = (stateData, abbr) => stateData.find(d => d.state_abbr === abbr.toLowerCase())

const stateFromName = (stateData, name) => stateData.find(d => d.state_name === name.toLowerCase())

const lookupStatesByRegion = (stateData, regioncode) => {
  const states = [];
  Object.keys(stateData).forEach(data => {
    if (stateData[data].region_code === regioncode) {
        states.push(stateData[data]);
    }
  })
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

const generatePlaceId = (filters, regionData, stateData) => {
    if (filters.placeType === 'state') {
      return lookupStateByName(stateData, filters.place).state_abbr
    } else if (filters.placeType === 'region') {
        return lookupRegionByName(regionData, filters.place).region_code
    } else if (filters.placeType === 'national') {
      return 'national';
    }
    return null;
}

const validateFilter = (filters, regionData, stateData) => {
  if (filters.placeType === 'state') {
    return isValidState(stateData, filters.place)
  } else if (filters.placeType === 'region') {
      return isValidRegion(regionData, filters.place)
  } else if (filters.placeType === 'agency') {
    return true;
  } else if (filters.placeType === 'national') {
    return true;
  }
  return false;
}

const lookupDisplayName = (filters, regionData, stateData) => {
  let n = null;
  if (isValidPlaceType(filters.placeType)) {
    if (filters.place === 'united-states') {
      n = 'United States'
    }
    if (filters.placeType === 'state') {
      n = lookupStateByName(stateData, filters.place).state_name
    } else if (filters.placeType === 'region') {
        n = `${lookupRegionByName(regionData, filters.place).region_name} Region`
      }
  }
  return n;
}

const generateDisplayName = (place, placeType) => {
  if (placeType === 'state') {
    const state = place.replace('-', ' ');
    return startCase(state)
  } else if (placeType === 'region' && place !== 'united-states') {
      return `${startCase(place)} Region`
  }
  return 'United States'
}

const getPlaceId = (filters, regionData, stateData) => {
  if (isValidPlaceType(filters.placeType)) {
    if (filters.placeType === 'state') {
      return lookupStateByName(stateData, filters.place).state_abbr;
    } else if (filters.placeType === 'region') {
        return lookupRegionByName(regionData, filters.place).region_name
    }
  }
  return null;
}

export { lookupStateByName, lookupRegionByName, lookupStatesByRegion,
  stateFromAbbr, stateFromName, isValidState, isValidRegion, lookupStateByAbbr,
  lookupRegionByCode, validateFilter, lookupDisplayName, generateDisplayName,
  getPlaceId, generatePlaceId }
