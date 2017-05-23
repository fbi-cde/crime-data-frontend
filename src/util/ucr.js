import offenses from './offenses'
import { slugify } from './text'
import lookupUsa from './usa'

import data from '../../public/data/ucr-program-participation.json'

const lookup = state => data[slugify(state)] || {}

const isValidPlace = (place, placeType) => lookupUsa(place, placeType)
const isValidCrime = crime => offenses.includes(crime)
const noNibrs = ['violent-crime', 'property-crime']

export const shouldFetchUcr = ({ place }) => !!isValidPlace(place)

export const shouldFetchSummaries = ({ crime, place, placeType }) =>
  isValidCrime(crime) && isValidPlace(place, placeType)

export const shouldFetchNibrs = ({ crime, place }) => {
  if (noNibrs.includes(crime) || !isValidPlace(place)) return false
  const coverage = lookup(place)
  return coverage && coverage.nibrs
}

export default lookup
