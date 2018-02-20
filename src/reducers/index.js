import { combineReducers } from 'redux'

import agencies from './agencies'
import feedback from './feedback'
import filters from './filters'
import glossary from './glossary'
import nibrs from './nibrs'
import participation from './participation'
import policeEmployment from './policeEmployment'
import sidebar from './sidebar'
import summaries from './summary'
import region from './region'
import states from './states'
import nibrsCounts from './nibrsCounts'
import leoka from './leoka'
import summarized from './summarized'


export default combineReducers({
  agencies,
  feedback,
  filters,
  glossary,
  nibrs,
  participation,
  policeEmployment,
  sidebar,
  summaries,
  region,
  states,
  nibrsCounts,
  leoka,
  summarized,
})
