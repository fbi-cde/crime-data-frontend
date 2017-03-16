/* eslint-disable import/no-unresolved */
import { combineReducers } from 'redux'

import filters from './filters'
import glossary from './glossary'
import nibrs from './nibrs'
import sidebar from './sidebar'
import summaries from './summary'
import ucr from './ucr'


export default combineReducers({
  filters,
  glossary,
  nibrs,
  sidebar,
  summaries,
  ucr,
})
