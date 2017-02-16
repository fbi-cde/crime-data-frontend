
import data from '../../data/ucr-program-participation.json'

const dataSourcesReportedByState = state => data[state] || null

export default dataSourcesReportedByState
