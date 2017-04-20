import { slugify } from './text'


const offenses = {
  'aggravated-assault': 'aggravated-assault',
  arson: 'arson',
  burglary: 'burglary',
  'larceny-theft': 'larceny',
  'motor-vehicle-theft': 'motor-vehicle-theft',
  homicide: 'homicide',
  'property-crime': 'Property',
  rape: 'rape',
  robbery: 'robbery',
  'violent-crime': 'Violent',
}
const ids = Object.keys(offenses)

const violentCrime = [
  {
    id: 'violent-crime',
    text: 'All Violent Crime',
  },
  'Homicide',
  'Rape',
  'Robbery',
  'Aggravated Assault',
]

const propertyCrime = [
  {
    id: 'property-crime',
    text: 'All Property Crime',
  },
  'Arson',
  'Burglary',
  'Larceny Theft',
  'Motor Vehicle Theft',
]

const crimeTypes = { violentCrime, propertyCrime }

const offenseParams = {
  'aggravated-assault': 'explorer_offense',
  arson: 'explorer_offense',
  burglary: 'explorer_offense',
  'larceny-theft': 'explorer_offense',
  'motor-vehicle-theft': 'explorer_offense',
  homicide: 'explorer_offense',
  'property-crime': 'classification',
  rape: 'explorer_offense',
  robbery: 'explorer_offense',
  'violent-crime': 'classification',
}

const mapToApiOffense = o => offenses[o] || slugify(o)
const mapToApiOffenseParam = o => offenseParams[o]

export { ids as default, mapToApiOffense, mapToApiOffenseParam, crimeTypes }
