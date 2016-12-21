import {
  FILTER_RESET,
  FILTER_UPDATE,
} from './actionTypes'

export const resetFilter = ({ id }) => ({
  type: FILTER_RESET,
  id,
})

export const updateFilter = ({ id, value }) => ({
  type: FILTER_UPDATE,
  id,
  value,
})
