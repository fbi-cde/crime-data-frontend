
import data from '../../data/ucr-program-participation.json'

const dataSourcesReportedByState = state => data[state] || data.virginia

export default dataSourcesReportedByState
