import data from '../../data/ucr-program-participation.json'
import lookupUsa, { nationalKey } from './usa'
import offenses from './offenses'
import { slugify } from './text'

const lookup = state => data[slugify(state)]

const isValidPlace = place => lookupUsa(place)
const isValidCrime = crime => offenses.includes(crime)
const noNibrs = ['violent-crime', 'property-crime']

export const shouldFetchUcr = ({ place }) => (
  !!(isValidPlace(place) && place !== nationalKey)
)

export const shouldFetchSummaries = ({ crime, place }) => (
  isValidCrime(crime) && isValidPlace(place)
)

export const shouldFetchNibrs = ({ crime, place }) => {
  if (noNibrs.includes(crime) || !isValidPlace(place)) return false
  const coverage = lookup(place)
  return coverage && coverage.nibrs
}

export default lookup
