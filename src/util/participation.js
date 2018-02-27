import offensesUtil from './offenses'
import { oriToState } from './agencies'
import { validateFilter } from './location'

import data from '../../public/data/ucr-program-participation.json'

const lookup = state => data[state] || {}

const isValidCrime = crime => offensesUtil.includes(crime)
const noNibrs = ['violent-crime', 'property-crime']

export const shouldFetchUcr = (filters, region, states) => filters.placeType !== 'agency' && validateFilter(filters, region.regions, states.states)

export const shouldFetchSummaries = (filters, region, states) =>
  isValidCrime(filters.pageType) && validateFilter(filters, region.regions, states.states)

export const shouldFetchNibrs = ({ pageType, place, placeType }) => {
  if (noNibrs.includes(pageType) || pageType === 'violent-crime' || pageType === 'property-crime') return false

  if (placeType === 'region') return true;

  const placeNorm = placeType === 'agency' ? oriToState(place) : place
  const coverage = lookup(placeNorm)
  return coverage && coverage.nibrs
}

export const reshapeData = dataIn => Object.assign(...dataIn.map(d => ({ [d.place]: d.results })))

export default lookup
