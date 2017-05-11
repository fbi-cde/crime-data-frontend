const crimeIds = {
  'aggravated-assault': 'aggravated assault',
  arson: 'arson',
  burglary: 'burglary',
  'motor-vehicle-theft': 'motor vehicle theft',
  homicide: 'homicide',
  larceny: 'larceny',
  'property-crime': 'property crime',
  rape: 'rape (legacy definition)',
  robbery: 'robbery',
  'violent-crime': 'violent crime',
}

const mapCrimeToGlossaryTerm = crime => crimeIds[crime]

export default mapCrimeToGlossaryTerm
