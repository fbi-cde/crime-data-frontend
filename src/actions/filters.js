import { FILTER_RESET, FILTERS_UPDATE } from './constants'

export const resetFilter = ({ id }) => ({ type: FILTER_RESET, id })
export const updateFilters = filters => ({ type: FILTERS_UPDATE, filters })
