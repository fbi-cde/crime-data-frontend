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
  },
  'LEOKA'
]

const mapToApiOffense = o => specializedDataSets[o] || slugify(o)

export { ids as default, mapToApiOffense, dataSets, specializedDataSets }
