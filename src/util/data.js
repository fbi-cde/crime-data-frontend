/* eslint-disable quote-props,import/prefer-default-export  */

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

export { crimeTypes }
