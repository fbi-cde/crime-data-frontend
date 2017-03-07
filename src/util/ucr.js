import data from '../../data/ucr-program-participation.json'
import { nationalKey } from '../util/usa'
import { slugify } from './text'

const lookup = state => data[slugify(state)]

export const shouldFetchUcr = ({ place }) => place !== nationalKey
export const shouldFetchSummaries = ({ crime, place }) => crime && place
export const shouldFetchNibrs = ({ place }) => {
  const coverage = lookup(place)
  return coverage && coverage.nibrs
}

export default lookup
