import {
  FILTER_RESET,
  FILTER_UPDATE,
} from '../actions/actionTypes'

export default (state = {}, action) => {
  let temp
  switch (action.type) {
    case FILTER_RESET:
      temp = Object.assign({}, state)
      delete temp[action.id]
      return temp
    case FILTER_UPDATE:
      return Object.assign({}, state, {
        [action.id]: action.value,
      })
    default:
      return state
  }
}
