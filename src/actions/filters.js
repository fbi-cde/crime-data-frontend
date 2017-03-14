import { FILTER_RESET, FILTERS_UPDATE } from './constants'
import lookupUsa from '../util/usa'
import offenses from '../util/offenses'

const isValidCrime = crime => offenses.includes(crime)
const isValidPlace = place => lookupUsa(place)

export const resetFilter = ({ id }) => ({ type: FILTER_RESET, id })
export const updateFilters = filters => {
  const f = { ...filters }

  if (f.crime && !isValidCrime(f.crime)) delete f.crime
  if (f.place && !isValidPlace(f.place)) delete f.place

  return { type: FILTERS_UPDATE, filters: f }
}
