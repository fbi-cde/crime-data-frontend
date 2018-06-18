import { slugify } from './text'

const specializedDataSets = {
  'violence-against-women': 'violence-against-women',
  leoka: 'leoka'
}

const ids = Object.keys(specializedDataSets)

const dataSets = [
  {
    id: 'violence-against-women',
    text: 'Violence Against Women'
  }
]

const vawDataSetCrimes = [
  {
    id: 'violent-crime',
    text: 'Violent Crime',
    dataset: 'violence-against-women'
  },
  {
    id: 'aggravated-assault',
    text: 'Aggravated Assault',
    dataset: 'violence-against-women'
  },
  {
    id: 'homicide',
    text: 'Homicide',
    dataset: 'violence-against-women'
  },
  {
    id: 'rape',
    text: 'Rape',
    dataset: 'violence-against-women'
  },
  {
    id: 'robbery',
    text: 'Robbery',
    dataset: 'violence-against-women'
  },
  {
    id: 'fondling',
    text: 'Fondling',
    dataset: 'violence-against-women'
  },
  {
    id: 'human-trafficking',
    text: 'Human Trafficking',
    dataset: 'violence-against-women'
  },
  {
    id: 'intimidation',
    text: 'Intimidation',
    dataset: 'violence-against-women'
  },
  {
    id: 'simple-assault',
    text: 'Simple Assault',
    dataset: 'violence-against-women'
  },
  {
    id: 'kidnapping',
    text: 'Kidnapping/Abduction',
    dataset: 'violence-against-women'
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
