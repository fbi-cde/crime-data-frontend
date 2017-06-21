export const stateData = [
  {
    id: 'usa',
    slug: 'united-states',
    display: 'United States',
  },
  {
    id: 'ak',
    slug: 'alaska',
    display: 'Alaska',
  },
  {
    id: 'al',
    slug: 'alabama',
    display: 'Alabama',
  },
  {
    id: 'ar',
    slug: 'arkansas',
    display: 'Arkansas',
  },
  {
    id: 'az',
    slug: 'arizona',
    display: 'Arizona',
  },
  {
    id: 'ca',
    slug: 'california',
    display: 'California',
  },
  {
    id: 'co',
    slug: 'colorado',
    display: 'Colorado',
  },
  {
    id: 'ct',
    slug: 'connecticut',
    display: 'Connecticut',
  },
  {
    id: 'dc',
    slug: 'district-of-columbia',
    display: 'District Of Columbia',
  },
  {
    id: 'de',
    slug: 'delaware',
    display: 'Delaware',
  },
  {
    id: 'fl',
    slug: 'florida',
    display: 'Florida',
  },
  {
    id: 'ga',
    slug: 'georgia',
    display: 'Georgia',
  },
  {
    id: 'hi',
    slug: 'hawaii',
    display: 'Hawaii',
  },
  {
    id: 'ia',
    slug: 'iowa',
    display: 'Iowa',
  },
  {
    id: 'id',
    slug: 'idaho',
    display: 'Idaho',
  },
  {
    id: 'il',
    slug: 'illinois',
    display: 'Illinois',
  },
  {
    id: 'in',
    slug: 'indiana',
    display: 'Indiana',
  },
  {
    id: 'ks',
    slug: 'kansas',
    display: 'Kansas',
  },
  {
    id: 'ky',
    slug: 'kentucky',
    display: 'Kentucky',
  },
  {
    id: 'la',
    slug: 'louisiana',
    display: 'Louisiana',
  },
  {
    id: 'ma',
    slug: 'massachusetts',
    display: 'Massachusetts',
  },
  {
    id: 'md',
    slug: 'maryland',
    display: 'Maryland',
  },
  {
    id: 'me',
    slug: 'maine',
    display: 'Maine',
  },
  {
    id: 'mi',
    slug: 'michigan',
    display: 'Michigan',
  },
  {
    id: 'mn',
    slug: 'minnesota',
    display: 'Minnesota',
  },
  {
    id: 'mo',
    slug: 'missouri',
    display: 'Missouri',
  },
  {
    id: 'ms',
    slug: 'mississippi',
    display: 'Mississippi',
  },
  {
    id: 'mt',
    slug: 'montana',
    display: 'Montana',
  },
  {
    id: 'nc',
    slug: 'north-carolina',
    display: 'North Carolina',
  },
  {
    id: 'nd',
    slug: 'north-dakota',
    display: 'North Dakota',
  },
  {
    id: 'ne',
    slug: 'nebraska',
    display: 'Nebraska',
  },
  {
    id: 'nh',
    slug: 'new-hampshire',
    display: 'New Hampshire',
  },
  {
    id: 'nj',
    slug: 'new-jersey',
    display: 'New Jersey',
  },
  {
    id: 'nm',
    slug: 'new-mexico',
    display: 'New Mexico',
  },
  {
    id: 'nv',
    slug: 'nevada',
    display: 'Nevada',
  },
  {
    id: 'ny',
    slug: 'new-york',
    display: 'New York',
  },
  {
    id: 'oh',
    slug: 'ohio',
    display: 'Ohio',
  },
  {
    id: 'ok',
    slug: 'oklahoma',
    display: 'Oklahoma',
  },
  {
    id: 'or',
    slug: 'oregon',
    display: 'Oregon',
  },
  {
    id: 'pa',
    slug: 'pennsylvania',
    display: 'Pennsylvania',
  },
  {
    id: 'ri',
    slug: 'rhode-island',
    display: 'Rhode Island',
  },
  {
    id: 'sc',
    slug: 'south-carolina',
    display: 'South Carolina',
  },
  {
    id: 'sd',
    slug: 'south-dakota',
    display: 'South Dakota',
  },
  {
    id: 'tn',
    slug: 'tennessee',
    display: 'Tennessee',
  },
  {
    id: 'tx',
    slug: 'texas',
    display: 'Texas',
  },
  {
    id: 'ut',
    slug: 'utah',
    display: 'Utah',
  },
  {
    id: 'va',
    slug: 'virginia',
    display: 'Virginia',
  },
  {
    id: 'vt',
    slug: 'vermont',
    display: 'Vermont',
  },
  {
    id: 'wa',
    slug: 'washington',
    display: 'Washington',
  },
  {
    id: 'wi',
    slug: 'wisconsin',
    display: 'Wisconsin',
  },
  {
    id: 'wv',
    slug: 'west-virginia',
    display: 'West Virginia',
  },
  {
    id: 'wy',
    slug: 'wyoming',
    display: 'Wyoming',
  },
]

export const nationalKey = 'united-states'

export const lookupUsa = (query = '', field = 'slug') =>
  stateData.find(d => d[field].toUpperCase() === query.toUpperCase()) || null
