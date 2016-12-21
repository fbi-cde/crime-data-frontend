const states = {
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

const getStateNameFromAbbr = abbr => states[abbr.toLowerCase()]

const getStateAbbrFromName = name => (
  Object.keys(states).filter(key => (
    states[key] === name.toLowerCase()
  )).pop()
)

const lookup = query => {
  if (query.length === 2) return getStateNameFromAbbr(query)
  return getStateAbbrFromName(query)
}

export { lookup as default, states }
