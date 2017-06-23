/* eslint no-param-reassign: 0 */
import { FILTER_RESET, FILTERS_UPDATE } from '../actions/constants'

const initialState = {
  crime: 'violent-crime',
  place: 'united-states',
  placeType: 'national',
  since: 2004,
  until: 2014,
}

export default (state = initialState, action) => {
  let temp
  switch (action.type) {
    case FILTER_RESET:
      temp = Object.assign({}, state)
      delete temp[action.id]
      return temp
    case FILTERS_UPDATE:
      return {
        ...state,
        ...action.filters,
      }
    default:
      return state
  }
}
