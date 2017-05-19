import initialData from '../../data/agencies-by-state.json'
import { slugify } from '../util/text'
import lookupUsa from '../util/usa'

import { AGENCY_FETCHING, AGENCY_RECEIVED } from '../actions/constants'

// hack to load in all the data while we wait for more specific endoints
const agencies = Object.keys(initialData)
  .filter(usState => lookupUsa(usState))
  .map(usState => ({
    key: slugify(lookupUsa(usState)),
    value: initialData[usState],
  }))
  .reduce(
    (accu, next) => ({
      ...accu,
      [next.key]: next.value,
    }),
    {},
  )
const initialState = {
  loading: false,
  ...agencies,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENCY_FETCHING:
      return {
        ...state,
        loading: true,
      }
    case AGENCY_RECEIVED:
      return {
        ...state,
        ...action.agency,
        loading: false,
      }
    default:
      return state
  }
}
