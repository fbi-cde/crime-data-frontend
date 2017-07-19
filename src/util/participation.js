import offenses from './offenses'
import { oriToState } from './agencies'
import { slugify } from './text'
import lookupUsa from './usa'

import data from '../../public/data/ucr-program-participation.json'

const lookup = state => data[slugify(state)] || {}

const isValidPlace = (place, placeType) => lookupUsa(place, placeType)
const isValidCrime = crime => offenses.includes(crime)
const noNibrs = ['violent-crime', 'property-crime']

export const shouldFetchUcr = ({ place, placeType }) =>
  placeType !== 'agency' && !!isValidPlace(place, placeType)

export const shouldFetchSummaries = ({ crime, place, placeType }) =>
  isValidCrime(crime) && isValidPlace(place, placeType)

export const shouldFetchNibrs = ({ crime, place, placeType }) => {
  if (noNibrs.includes(crime) || !isValidPlace(place, placeType)) return false

  const placeNorm = placeType === 'agency' ? oriToState(place) : place
  const coverage = lookup(placeNorm)
  return coverage && coverage.nibrs
}

export const reshapeData = dataIn =>
  Object.assign(...dataIn.map(d => ({ [d.place]: d.results })))

export default lookup
