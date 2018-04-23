import { combineReducers } from 'redux'

import agencies from './agencies'
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
import footnotes from './footnote'


export default combineReducers({
  agencies,
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
  footnotes,
})
