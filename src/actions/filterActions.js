import { FILTER_RESET, FILTERS_UPDATE } from './actionTypes'

export const resetFilter = ({ id }) => ({ type: FILTER_RESET, id })
export const updateFilters = filters => ({ type: FILTERS_UPDATE, filters })
