
const dataSources = {
  alabama: {
    srs: true,
    nibrs: false,
    hybrid: false,
  },
  alaska: {
    srs: false,
    nibrs: false,
    hybrid: true,
  },
  arizona: {
    srs: false,
    nibrs: false,
    hybrid: true,
  },
  arkansas: {
    srs: false,
    nibrs: true,
    hybrid: false,
  },
  california: {
    srs: true,
    nibrs: true,
    hybrid: true,
  },
  colorado: {
    srs: false,
    nibrs: true,
    hybrid: false,
  },
  connecticut: {
    srs: false,
    nibrs: false,
    hybrid: true,
  },
  delaware: {
    srs: false,
    nibrs: true,
    hybrid: false,
  },
  idaho: {
    srs: false,
    nibrs: true,
    hybrid: false,
  },
  virginia: {
    srs: true,
    nibrs: false,
    hybrid: false,
  },
}

const dataSourcesReportedByState = state => (
  dataSources[state] || dataSources.virginia
)

export default dataSourcesReportedByState
