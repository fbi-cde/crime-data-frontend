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
const mapToApiOffense = o => offenses[o] || slugify(o)

export { ids as default, mapToApiOffense, crimeTypes }
