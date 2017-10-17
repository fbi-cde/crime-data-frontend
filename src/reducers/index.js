import { combineReducers } from 'redux'

import agencies from './agencies'
import feedback from './feedback'
import filters from './filters'
import glossary from './glossary'
import nibrs from './nibrs'
import participation from './participation'
import sidebar from './sidebar'
import summaries from './summary'
import region from './region'


export default combineReducers({
  agencies,
  feedback,
  filters,
  glossary,
  nibrs,
  participation,
  sidebar,
  summaries,
  region,
})
