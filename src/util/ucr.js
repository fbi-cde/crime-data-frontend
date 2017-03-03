import data from '../../data/ucr-program-participation.json'
import { nationalKey } from '../util/usa'
import { slugify } from './text'
import ucrDataCoverage from '../util/ucr'

export const shouldFetchUcr = ({ place }) => place !== nationalKey
export const shouldFetchSummaries = ({ crime, place }) => crime && place
export const shouldFetchNibrs = ({ place }) => {
  const coverage = ucrDataCoverage(place)
  return coverage && coverage.nibrs
}

export default function (state) { return data[slugify(state)] }
