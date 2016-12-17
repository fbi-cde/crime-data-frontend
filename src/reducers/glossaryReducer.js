import {
  GLOSSARY_HIDE,
  GLOSSARY_SHOW,
} from '../actions/actionTypes'

const initialState = {
  isVisible: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOSSARY_HIDE:
      return Object.assign({}, state, {
        isVisible: false,
      })
    case GLOSSARY_SHOW:
      return Object.assign({}, state, {
        isVisible: true,
      })
    default:
      return state
  }
}
