import { slugify } from './text'

const offenses = {
  'aggravated-assault': 'aggravated-assault',
  burglary: 'burglary',
  larceny: 'larceny',
  'motor-vehicle-theft': 'motor-vehicle-theft',
  homicide: 'homicide',
  'property-crime': 'Property',
  rape: 'rape',
  robbery: 'robbery',
  'violent-crime': 'Violent',
}
const ids = Object.keys(offenses)

const offenseParams = {
  'aggravated-assault': 'explorer_offense',
  burglary: 'explorer_offense',
  larceny: 'explorer_offense',
  'motor-vehicle-theft': 'explorer_offense',
  homicide: 'offense_category',
  'property-crime': 'classification',
  rape: 'explorer_offense',
  robbery: 'explorer_offense',
  'violent-crime': 'classification',
}

const mapToApiOffense = o => offenses[o] || slugify(o)
const mapToApiOffenseParam = o => offenseParams[o]

export default ids
export {
  mapToApiOffense,
  mapToApiOffenseParam,
}
