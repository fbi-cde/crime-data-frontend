import startCase from 'lodash.startcase'

const nationalKey = 'united-states'
const data = [
  { id: 'usa', slug: nationalKey },
  { id: 'ak', slug: 'alaska' },
  { id: 'al', slug: 'alabama' },
  { id: 'ar', slug: 'arkansas' },
  { id: 'az', slug: 'arizona' },
  { id: 'ca', slug: 'california' },
  { id: 'co', slug: 'colorado' },
  { id: 'ct', slug: 'connecticut' },
  { id: 'de', slug: 'delaware' },
  { id: 'fl', slug: 'florida' },
  { id: 'ga', slug: 'georgia' },
  { id: 'hi', slug: 'hawaii' },
  { id: 'ia', slug: 'iowa' },
  { id: 'id', slug: 'idaho' },
  { id: 'il', slug: 'illinois' },
  { id: 'in', slug: 'indiana' },
  { id: 'ks', slug: 'kansas' },
  { id: 'ky', slug: 'kentucky' },
  { id: 'la', slug: 'louisiana' },
  { id: 'ma', slug: 'massachusetts' },
  { id: 'md', slug: 'maryland' },
  { id: 'me', slug: 'maine' },
  { id: 'mi', slug: 'michigan' },
  { id: 'mn', slug: 'minnesota' },
  { id: 'mo', slug: 'missouri' },
  { id: 'ms', slug: 'mississippi' },
  { id: 'mt', slug: 'montana' },
  { id: 'nc', slug: 'north-carolina' },
  { id: 'nd', slug: 'north-dakota' },
  { id: 'ne', slug: 'nebraska' },
  { id: 'nh', slug: 'new-hampshire' },
  { id: 'nj', slug: 'new-jersey' },
  { id: 'nm', slug: 'new-mexico' },
  { id: 'nv', slug: 'nevada' },
  { id: 'ny', slug: 'new-york' },
  { id: 'oh', slug: 'ohio' },
  { id: 'ok', slug: 'oklahoma' },
  { id: 'or', slug: 'oregon' },
  { id: 'pa', slug: 'pennsylvania' },
  { id: 'ri', slug: 'rhode-island' },
  { id: 'sc', slug: 'south-carolina' },
  { id: 'sd', slug: 'south-dakota' },
  { id: 'tn', slug: 'tennessee' },
  { id: 'tx', slug: 'texas' },
  { id: 'ut', slug: 'utah' },
  { id: 'va', slug: 'virginia' },
  { id: 'vt', slug: 'vermont' },
  { id: 'wa', slug: 'washington' },
  { id: 'dc', display: 'Washington, DC', slug: 'washington-dc' },
  { id: 'wi', slug: 'wisconsin' },
  { id: 'wv', slug: 'west-virginia' },
  { id: 'wy', slug: 'wyoming' },
].map(d => ({
  ...d,
  display: d.display || startCase(d.slug),
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

export { lookup as default, data, nationalKey }
