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
    text: 'All violent crime',
  },
  'Homicide',
  'Rape',
  'Robbery',
  'Aggravated assault',
]

const propertyCrime = [
  {
    id: 'property-crime',
    text: 'All property crime',
  },
  'Arson',
  'Burglary',
  {
    id: 'larceny',
    text: 'Larceny theft',
  },
  'Motor vehicle theft',
]

const crimeTypes = { violentCrime, propertyCrime }
const mapToApiOffense = o => offenses[o] || slugify(o)

export { ids as default, mapToApiOffense, crimeTypes }
