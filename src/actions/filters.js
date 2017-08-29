import { FILTER_RESET, FILTERS_UPDATE } from './constants'
import offensesUtil from '../util/offenses'
import lookupUsa from '../util/usa'

const isValidCrime = crime => offensesUtil.includes(crime)

export const resetFilter = ({ id }) => ({ type: FILTER_RESET, id })
export const updateFilters = filters => {
  const f = { ...filters }

  if (f.crime && !isValidCrime(f.crime)) delete f.crime
  if (f.place && !lookupUsa(f.place, f.placeType)) delete f.place

  return { type: FILTERS_UPDATE, filters: f }
}
