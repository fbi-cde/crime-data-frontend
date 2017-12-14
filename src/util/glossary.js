const crimeIds = {
  'aggravated-assault': 'aggravated assault',
  arson: 'arson',
  burglary: 'burglary',
  'motor-vehicle-theft': 'motor vehicle theft',
  homicide: 'homicide',
  larceny: 'larceny',
  'property-crime': 'property crime',
  rape: 'rape (legacy definition)',
  'rape-revised': 'rape (revised definition)',
  robbery: 'robbery',
  'violent-crime': 'violent crime',
  'police-employment': 'police employment'
}

const mapCrimeToGlossaryTerm = crime => crimeIds[crime]

export default mapCrimeToGlossaryTerm
