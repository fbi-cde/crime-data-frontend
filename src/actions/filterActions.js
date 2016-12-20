import {
  FILTER_RESET,
  FILTER_UPDATE,
} from './actionTypes'

export const reset = ({ id }) => ({
  type: FILTER_RESET,
  id,
})

export const update = ({ id, value }) => ({
  type: FILTER_UPDATE,
  id,
  value,
})
