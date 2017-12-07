import offensesUtil from './offenses'
import { oriToState } from './agencies'
import { validateFilter, isValidState } from './location'

import data from '../../public/data/ucr-program-participation.json'

const lookup = state => data[state] || {}

const isValidCrime = crime => offensesUtil.includes(crime)
const noNibrs = ['violent-crime', 'property-crime']

export const shouldFetchUcr = (filters, region, states) => filters.placeType !== 'agency' && validateFilter(filters, region.regions, states.states)

export const shouldFetchSummaries = (filters, region, states) =>
  isValidCrime(filters.crime) && validateFilter(filters, region.regions, states.states)

export const shouldFetchNibrs = ({ crime, place, placeType }, states) => {
  if (noNibrs.includes(crime) || !isValidState(states.states, place)) return false

  const placeNorm = placeType === 'agency' ? oriToState(place) : place
  const coverage = lookup(placeNorm)
  return coverage && coverage.nibrs
}

export const reshapeData = dataIn => Object.assign(...dataIn.map(d => ({ [d.place]: d.results })))

export default lookup
