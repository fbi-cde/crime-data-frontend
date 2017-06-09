import { slugify } from './text'

const offenses = {
  'aggravated-assault': 'aggravated-assault',
  arson: 'arson',
  burglary: 'burglary',
  larceny: 'larceny',
  'motor-vehicle-theft': 'motor-vehicle-theft',
  homicide: 'homicide',
  'property-crime': 'property',
  rape: 'rape',
  robbery: 'robbery',
  'violent-crime': 'violent',
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
  {
    id: 'larceny',
    text: 'Larceny Theft',
  },
  'Motor Vehicle Theft',
]

const crimeTypes = { violentCrime, propertyCrime }
const mapToApiOffense = o => offenses[o] || slugify(o)

export { ids as default, mapToApiOffense, crimeTypes }
