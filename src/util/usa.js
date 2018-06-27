import startCase from 'lodash.startcase'

const nationalKey = 'united-states'
const data = [
  { id: 'usa', slug: nationalKey, placeType: 'state' },
  { id: 'al', slug: 'alabama', placeType: 'state' },
  { id: 'ak', slug: 'alaska', placeType: 'state' },
  { id: 'az', slug: 'arizona', placeType: 'state' },
  { id: 'ar', slug: 'arkansas', placeType: 'state' },
  { id: 'ca', slug: 'california', placeType: 'state' },
  { id: 'co', slug: 'colorado', placeType: 'state' },
  { id: 'ct', slug: 'connecticut', placeType: 'state' },
  { id: 'de', slug: 'delaware', placeType: 'state' },
  { id: 'fl', slug: 'florida', placeType: 'state' },
  { id: 'ga', slug: 'georgia', placeType: 'state' },
  { id: 'hi', slug: 'hawaii', placeType: 'state' },
  { id: 'id', slug: 'idaho', placeType: 'state' },
  { id: 'ia', slug: 'iowa', placeType: 'state' },
  { id: 'il', slug: 'illinois', placeType: 'state' },
  { id: 'in', slug: 'indiana', placeType: 'state' },
  { id: 'ks', slug: 'kansas', placeType: 'state' },
  { id: 'ky', slug: 'kentucky', placeType: 'state' },
  { id: 'la', slug: 'louisiana', placeType: 'state' },
  { id: 'me', slug: 'maine', placeType: 'state' },
  { id: 'md', slug: 'maryland', placeType: 'state' },
  { id: 'ma', slug: 'massachusetts', placeType: 'state' },
  { id: 'mi', slug: 'michigan', placeType: 'state' },
  { id: 'mn', slug: 'minnesota', placeType: 'state' },
  { id: 'ms', slug: 'mississippi', placeType: 'state' },
  { id: 'mo', slug: 'missouri', placeType: 'state' },
  { id: 'mt', slug: 'montana', placeType: 'state' },
  { id: 'ne', slug: 'nebraska', placeType: 'state' },
  { id: 'nc', slug: 'north-carolina', placeType: 'state' },
  { id: 'nd', slug: 'north-dakota', placeType: 'state' },
  { id: 'nh', slug: 'new-hampshire', placeType: 'state' },
  { id: 'nj', slug: 'new-jersey', placeType: 'state' },
  { id: 'nm', slug: 'new-mexico', placeType: 'state' },
  { id: 'nv', slug: 'nevada', placeType: 'state' },
  { id: 'ny', slug: 'new-york', placeType: 'state' },
  { id: 'oh', slug: 'ohio', placeType: 'state' },
  { id: 'ok', slug: 'oklahoma', placeType: 'state' },
  { id: 'or', slug: 'oregon', placeType: 'state' },
  { id: 'pa', slug: 'pennsylvania', placeType: 'state' },
  { id: 'ri', slug: 'rhode-island', placeType: 'state' },
  { id: 'sc', slug: 'south-carolina', placeType: 'state' },
  { id: 'sd', slug: 'south-dakota', placeType: 'state' },
  { id: 'tn', slug: 'tennessee', placeType: 'state' },
  { id: 'tx', slug: 'texas', placeType: 'state' },
  { id: 'ut', slug: 'utah', placeType: 'state' },
  { id: 'vt', slug: 'vermont', placeType: 'state' },
  { id: 'va', slug: 'virginia', placeType: 'state' },
  { id: 'wa', slug: 'washington', placeType: 'state' },
  {
    id: 'dc',
    display: 'Washington, DC',
    slug: 'washington-dc',
    placeType: 'state'
  },
  { id: 'wv', slug: 'west-virginia', placeType: 'state' },
  { id: 'wi', slug: 'wisconsin', placeType: 'state' },
  { id: 'wy', slug: 'wyoming', placeType: 'state' }
].map(d => ({
  ...d,
  display: d.display || startCase(d.slug)
}))

const fromAbbr = abbr => data.find(d => d.id === abbr.toLowerCase())

const fromSlug = slug => data.find(d => d.slug === slug)

const lookup = (query, type) => {
  if (!query) return null

  // TODO: better check for proper agency ids
  if (type === 'agency') return true

  if (query.length <= 3) return fromAbbr(query)
  return fromSlug(query)
}

export { lookup as default, data, nationalKey, fromSlug, fromAbbr }
