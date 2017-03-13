import data from '../../data/ucr-program-participation.json'
import lookupUsa, { nationalKey } from './usa'
import offenses from './offenses'
import { slugify } from './text'

const lookup = state => data[slugify(state)]

const isValidCrime = crime => offenses.includes(crime)
const isValidPlace = place => lookupUsa(place)

export const shouldFetchUcr = ({ place }) => {
  if (!isValidPlace(place) || place === nationalKey) return false
  return true
}

export const shouldFetchSummaries = ({ crime, place }) => (
  isValidCrime(crime) && isValidPlace(place)
)

export const shouldFetchNibrs = ({ place }) => {
  if (!isValidPlace(place)) return false
  const coverage = lookup(place)
  return coverage && coverage.nibrs
}

export default lookup
