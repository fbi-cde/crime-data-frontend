import {
  GLOSSARY_HIDE,
  GLOSSARY_SHOW,
  GLOSSARY_SHOW_TERM,
} from '../constants'

const hide = () => ({
  type: GLOSSARY_HIDE,
})

const show = () => ({
  type: GLOSSARY_SHOW,
})

const showTerm = term => ({
  type: GLOSSARY_SHOW_TERM,
  term,
})

export {
  hide,
  show,
  showTerm,
}
