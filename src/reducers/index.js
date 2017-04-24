/* eslint-disable import/no-unresolved */
import { combineReducers } from 'redux'

import feedback from './feedback'
import filters from './filters'
import glossary from './glossary'
import modal from './modal'
import nibrs from './nibrs'
import sidebar from './sidebar'
import summaries from './summary'
import ucr from './ucr'

export default combineReducers({
  feedback,
  filters,
  glossary,
  modal,
  nibrs,
  sidebar,
  summaries,
  ucr,
})
