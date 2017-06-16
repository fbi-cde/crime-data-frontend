import { combineReducers } from 'redux'

import agencies from './agencies'
import feedback from './feedback'
import filters from './filters'
import glossary from './glossary'
import nibrs from './nibrs'
import sidebar from './sidebar'
import summaries from './summary'
import ucr from './ucr'

export default combineReducers({
  agencies,
  feedback,
  filters,
  glossary,
  nibrs,
  sidebar,
  summaries,
  ucr,
})
