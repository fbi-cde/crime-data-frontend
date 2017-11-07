import { FILTER_RESET, FILTERS_UPDATE } from './constants'
import filterValidator from '../util/filter'

export const resetFilter = ({ id }) => ({ type: FILTER_RESET, id })
export const updateFilters = filters => {
  const f = filterValidator({ ...filters })
  console.log('UpdatedFilters:', f)
  return { type: FILTERS_UPDATE, filters: f }
}
