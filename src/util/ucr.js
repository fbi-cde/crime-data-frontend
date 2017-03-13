import data from '../../data/ucr-program-participation.json'
import lookupUsa, { nationalKey } from '../util/usa'
import { slugify } from './text'

const lookup = state => data[slugify(state)]

export const shouldFetchUcr = ({ place }) => {
  if (!lookupUsa(place) || place === nationalKey) return false
  return true
}
export const shouldFetchSummaries = ({ crime, place }) => crime && place
export const shouldFetchNibrs = ({ place }) => {
  const coverage = lookup(place)
  return coverage && coverage.nibrs
}

export default lookup
