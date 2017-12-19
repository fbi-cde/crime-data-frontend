/* eslint-disable camelcase,consistent-return */
import reduceEntries from 'reduce-entries'

import lookupUsa from './usa'
import { lookupStateByAbbr } from './location'

const postalMappingExceptions = {
  NB: 'NE',
  GM: 'GU',
}

export const reshapeData = data =>
  Object.keys(data)
    .filter(key => lookupUsa(key))
    .map(key => ({ key: lookupUsa(key).slug, value: data[key] }))
    .reduce(reduceEntries())

export const oriToState = ori => {
  const oriAbbr = ori.slice(0, 2).toUpperCase()
  const postalAbbr = postalMappingExceptions[oriAbbr] || oriAbbr
  return lookupUsa(postalAbbr).slug
}


export const agencyDisplay = ({ agency_name, agency_type_name }) => {
  if (!agency_type_name) return agency_name
  return `${agency_name}`
}

export const getAgency = (agencies, ori) => {
  console.log("getAgency for ori: " + ori)
  const usState = oriToState(ori)
  console.log("state for ori: " + usState)
  console.log("agencies="+JSON.stringify(agencies))
  const agency = (agencies.data[usState] || {})[ori]
  console.log("agency obj: " + JSON.stringify(agency))
  if (!agency) return
  return { ...agency, display: agencyDisplay(agency) }
}

// New Data
export const shouldFetchAgencies = filters =>
  (filters.placeType === 'state' || filters.placeType === 'agency')

export const newOriToState = (ori, states) => {
    const oriAbbr = ori.slice(0, 2).toUpperCase()
    return lookupStateByAbbr(states.states, oriAbbr).state_name
}

export const newOriToStateAbbr = ori => {
    const oriAbbr = ori.slice(0, 2).toUpperCase()
    return oriAbbr;
}


export const newGetAgency = (agencies, ori, placeType) => {
  let n = null;
  if (placeType !== 'agency') { return n; }

  if (agencies.loaded === false) return n

  Object.keys(agencies.data).forEach(data => {
    if (agencies.data[data].ori === ori) {
        n = agencies.data[data]
    }
  })
  return n;
}
