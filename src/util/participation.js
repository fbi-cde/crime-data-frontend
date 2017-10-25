import offensesUtil from './offenses'
import { oriToState } from './agencies'
import { isValidState, isValidRegion } from './location'

import data from '../../public/data/ucr-program-participation.json'

const lookup = state => data[state] || {}

const isValidCrime = crime => offensesUtil.includes(crime)
const noNibrs = ['violent-crime', 'property-crime']

export const shouldFetchUcr = (filters, region, states) => {
  if (filters.placeType === 'state') {
     return isValidState(states.states, filters.place)
  } else if (filters.placeType === 'region') {
    return isValidRegion(region.regions, filters.place)
  }
  return false;
}

export const shouldFetchSummaries = ({ crime, place, placeType }) =>
  isValidCrime(crime) && isValidState(place, placeType)

export const shouldFetchNibrs = ({ crime, place, placeType }) => {
  if (noNibrs.includes(crime) || !isValidState(place, placeType)) return false

  const placeNorm = placeType === 'agency' ? oriToState(place) : place
  const coverage = lookup(placeNorm)
  return coverage && coverage.nibrs
}

export const reshapeData = dataIn => {
  console.log("ReshapeData:",dataIn)
  return Object.assign(...dataIn.map(d => ({ [d.place]: d.results })))

}

export default lookup
