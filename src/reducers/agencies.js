import initialData from '../../public/data/agencies-by-state.json'
import { oriToState } from '../util/ori'
import { slugify } from '../util/text'
import lookupUsa from '../util/usa'

import {
  AGENCY_FAILED,
  AGENCY_FETCHING,
  AGENCY_RECEIVED,
} from '../actions/constants'

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
  data: { ...agencies },
  error: null,
  loading: false,
}

const updateData = ({ agency, data }) => {
  const agencyUsState = oriToState(agency.ori)
  return {
    ...data,
    [agencyUsState]: {
      ...data[agencyUsState],
      [agency.ori]: agency,
    },
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENCY_FAILED:
      return {
        ...state,
        error: {
          code: action.error.response.status,
          message: action.error.message,
          url: action.error.config.url,
        },
        loading: false,
      }
    case AGENCY_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case AGENCY_RECEIVED:
      return {
        ...state,
        data: updateData({ agency: action.agency, data: state.data }),
        loading: false,
      }
    default:
      return state
  }
}
