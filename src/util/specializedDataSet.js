import { slugify } from './text'

const specializedDataSets = {
  'violence-against-women': 'violence-against-women',
  leoka: 'leoka'
}

const ids = Object.keys(specializedDataSets)

const dataSets = [
  {
    id: 'violence-against-women',
    text: 'Violence Against Women',
    param: 'violent-crime'
  }
]

const vawDataSetCrimes = [
  {
    id: 'violent-crime',
    text: 'Violent Crime'
  },
  {
    id: 'aggravated-assault',
    text: 'Aggravated Assault'
  },
  {
    id: 'burglary',
    text: 'Burglary'
  },
  {
    id: 'homicide',
    text: 'Homicide'
  },
  {
    id: 'rape',
    text: 'Rape'
  },
  {
    id: 'robbery',
    text: 'Robbery'
  },
  {
    id: 'fondling',
    text: 'Fondling'
  },
  {
    id: 'human-trafficking',
    text: 'Human Trafficking'
  },
  {
    id: 'intimidation',
    text: 'Intimidation'
  },
  {
    id: 'simple-assault',
    text: 'Simple Assault'
  },
  {
    id: 'kidnapping',
    text: 'Kidnapping/Abduction'
  }
]

const lookUpVAWCrime = param =>
  vawDataSetCrimes.find(d => d.id === param.toLowerCase())

const lookUpVAWCrimeByText = param =>
  vawDataSetCrimes.find(d => d.text.toLowerCase() === param.toLowerCase())

const mapToApiOffense = o => specializedDataSets[o] || slugify(o)

export {
  ids as default,
  mapToApiOffense,
  dataSets,
  specializedDataSets,
  vawDataSetCrimes,
  lookUpVAWCrime,
  lookUpVAWCrimeByText
}
