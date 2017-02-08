const offenses = {
  'aggravated-assault': 'Assault',
  burglary: 'Burglary',
  larceny: 'Larceny',
  'motor-vehicle-theft': 'Moter vehicle theft',
  homicide: 'Homicide',
  'all-property-crime': 'Property',
  rape: 'Rape',
  robbery: 'Robbery',
  'all-violent-crime': 'Violent',
}
const ids = Object.keys(offenses)

const offenseParams = {
  'aggravated-assault': 'offense',
  burglary: 'offense',
  larceny: 'offense',
  'motor-vehicle-theft': 'offense',
  homicide: 'offense_category',
  'all-property-crime': 'classification',
  rape: 'offense',
  robbery: 'offense',
  'all-violent-crime': 'classification',
}

const mapToApiOffense = o => offenses[o]
const mapToApiOffenseParam = o => offenseParams[o]

export default ids
export {
  mapToApiOffense,
  mapToApiOffenseParam,
}
