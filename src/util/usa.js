import lowerCase from 'lodash.lowercase'

import { slugify } from '../util/text'

const data = {
  usa: 'united states',
  ak: 'alaska',
  al: 'alabama',
  ar: 'arkansas',
  az: 'arizona',
  ca: 'california',
  co: 'colorado',
  ct: 'connecticut',
  dc: 'district of columbia',
  de: 'delaware',
  fl: 'florida',
  ga: 'georgia',
  hi: 'hawaii',
  ia: 'iowa',
  id: 'idaho',
  il: 'illinois',
  in: 'indiana',
  ks: 'kansas',
  ky: 'kentucky',
  la: 'louisiana',
  ma: 'massachusetts',
  md: 'maryland',
  me: 'maine',
  mi: 'michigan',
  mn: 'minnesota',
  mo: 'missouri',
  ms: 'mississippi',
  mt: 'montana',
  nc: 'north carolina',
  nd: 'north dakota',
  ne: 'nebraska',
  nh: 'new hampshire',
  nj: 'new jersey',
  nm: 'new mexico',
  nv: 'nevada',
  ny: 'new york',
  oh: 'ohio',
  ok: 'oklahoma',
  or: 'oregon',
  pa: 'pennsylvania',
  ri: 'rhode island',
  sc: 'south carolina',
  sd: 'south dakota',
  tn: 'tennessee',
  tx: 'texas',
  ut: 'utah',
  va: 'virginia',
  vt: 'vermont',
  wa: 'washington',
  wi: 'wisconsin',
  wv: 'west virginia',
  wy: 'wyoming',
}

const nationalKey = slugify(data.usa)

const getPlaceNameFromAbbr = abbr => data[abbr.toLowerCase()]

const getPlaceAbbrFromName = name =>
  Object.keys(data).filter(key => data[key] === name.toLowerCase()).pop()

const lookup = (query, type) => {
  if (!query) return null
  if (type === 'agency') return ['foo', 'bar'].includes(query)

  if (query.length <= 3) return getPlaceNameFromAbbr(query)
  return getPlaceAbbrFromName(lowerCase(query))
}

export { lookup as default, data, nationalKey }
