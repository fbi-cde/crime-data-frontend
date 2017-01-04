import {
  GLOSSARY_HIDE,
  GLOSSARY_SHOW,
  GLOSSARY_SHOW_TERM,
} from '../actions/actionTypes'

const initialState = {
  isVisible: false,
  term: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOSSARY_HIDE:
      return {
        ...state,
        isVisible: false,
      }
    case GLOSSARY_SHOW:
      return {
        ...state,
        isVisible: true,
      }
    case GLOSSARY_SHOW_TERM:
      return {
        ...state,
        isVisible: true,
        term: action.term,
      }
    default:
      return state
  }
}
