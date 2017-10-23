import offensesUtil from './offenses'
import { oriToState } from './agencies'
import lookupUsa from './usa'
import { lookupRegion } from './region'

import data from '../../public/data/ucr-program-participation.json'

const lookup = state => data[state] || {}

const isValidState = (place, placeType) => lookupUsa(place, placeType)
const isValidCrime = crime => offensesUtil.includes(crime)
const noNibrs = ['violent-crime', 'property-crime']

export const shouldFetchUcr = ({ place, placeType }) =>
  placeType !== 'agency' && !!isValidState(place, placeType)

export const shouldFetchSummaries = ({ crime, place, placeType }) =>
  isValidCrime(crime) && isValidState(place, placeType) && lookupRegion(place, placeType)

export const shouldFetchNibrs = ({ crime, place, placeType }) => {
  if (noNibrs.includes(crime) || !isValidState(place, placeType)) return false

  const placeNorm = placeType === 'agency' ? oriToState(place) : place
  const coverage = lookup(placeNorm)
  return coverage && coverage.nibrs
}

export const reshapeData = dataIn =>
  Object.assign(...dataIn.map(d => ({ [d.place]: d.results })))

export default lookup
