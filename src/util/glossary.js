const crimeIds = {
  'aggravated-assault': 'aggravated assault',
  arson: 'arson',
  burglary: 'burglary',
  'motor-vehicle-theft': 'motor vehicle theft',
  murder: 'murder and nonnegligent homicide',
  larceny: 'larceny',
  rape: 'rape (legacy definition)',
  robbery: 'robbery',
}

const mapCrimeToGlossaryTerm = crime => crimeIds[crime]

export default mapCrimeToGlossaryTerm
