const raceCodes = {
  A: 'Asian',
  AP: 'Native Hawaiian or Pacific Islander',
  B: 'Black or African American',
  I: 'American Indian or Alaska Native',
  U: 'Unknown',
  W: 'White',
}

const sexCodes = {
  F: 'Female',
  M: 'Male',
  U: 'Unknown',
}

const locationNameMapping = {
  'Abandoned/Condemned Structure': 'Abandoned/Condemned Structure',
  'Air/Bus/Train Terminal': 'Air/Bus/Train Terminal',
  'Amusement Park': 'Amusement Park',
  'Arena/Stadium/Fairgrounds/Coliseum': 'Arena/Stadium/Fairgrounds',
  'ATM Separate from Bank': 'ATM Separate from Bank',
  'Auto Dealership New/Used': 'Auto Dealership',
  'Bank/Savings and Loan': 'Bank',
  'Bar/Nightclub': 'Bar/Nightclub',
  'Camp/Campground': 'Campground',
  'Church Synagogue/Temple': 'Church/Synagogue/Temple/Mosque',
  'Commercial/Office Building': 'Commercial/Office Building',
  'Community Center': 'Community Center',
  'Construction Site': 'Construction Site',
  'Convenience Store': 'Convenience Store',
  Cyberspace: 'Cyberspace',
  'Daycare Facility': 'Daycare Facility',
  'Department/Discount Store': 'Department/Discount Store',
  'Dock/Wharf/Freight/Modal Terminal': 'Dock/Wharf/Shipping Terminal',
  'Drug Store/Dr. s Office/Hospital': 'Drug Store/Doctor’s Office/Hospital',
  'Farm Facility': 'Farm Facility',
  'Field/Woods': 'Field/Woods',
  'Gambling Facility/Casino/Race Track': 'Gambling Facility/Casino/Race Track',
  'Government/Public Building': 'Government/Public Building',
  'Grocery/Supermarket': 'Grocery Store',
  'Highway/Road/Ally': 'Highway/Alley/Street/Sidewalk',
  'Hotel/Motel/Etc.': 'Hotel/Motel',
  'Industrial Site': 'Industrial Site',
  'Jail/Prison': 'Jail/Prison/Corrections Facility',
  'Lake/Waterway': 'Lake/Waterway/Beach',
  'Liquor Store': 'Liquor Store',
  'Military Installation': 'Military Base',
  'Not Specified': 'Unknown',
  'Other/Unknown': 'Unknown',
  'Parking Lot/Garage': 'Parking Garage/Lot',
  'Park/Playground': 'Park/Playground',
  'Rental Stor. Facil.': 'Rental Storage Facility',
  'Residence/Home': 'Residence/Home',
  'Rest Area': 'Rest Area',
  Restaurant: 'Restaurant',
  'School/College': 'School/College',
  'School-College/University': 'School - College/University',
  'School-Elementary/Secondary': 'School - Elementary/Secondary',
  'Service/Gas Station': 'Gas Station',
  'Shelter-Mission/Homeless': 'Mission/Homeless Shelter',
  'Shopping Mall': 'Shopping Mall',
  'Specialty Store': 'Specialty Store',
  'Tribal Lands': 'Tribal Lands',
}

export const offenseMapping = {
  'aggravated-assault': 'Aggravated Assault',
  burglary: 'Burglary/Breaking & Entering',
  larceny: [
    'Not Specified',
    'Theft of Motor Vehicle Parts or Accessories',
    'Pocket-picking',
    'Theft From Motor Vehicle',
    'Purse-snatching',
    'Shoplifting',
    'All Other Larceny',
    'Theft From Building',
    'Theft From Coin-Operated Machine or Device',
  ],
  'motor-vehicle-theft': 'Motor Vehicle Theft',
  homicide: 'Murder and Nonnegligent Manslaughter',
  rape: ['Rape', 'Sexual Assault With An Object', 'Sodomy'],
  robbery: 'Robbery',
  arson: 'Arson',
}


// data munging functions

export const reshape = (data, key) => {
  const counts = data.reduce((a, b) => {
    a[b[key]] = (a[b[key]] || 0) + +b.count // eslint-disable-line no-param-reassign
    return a
  }, {})

  return Object.keys(counts).map(k => ({ key: k, count: counts[k] }))
}

const offenses = (data, offense) => {
  const nibrsOffense = offenseMapping[offense]


  const offenseData = data.offenseOffenseName.filter(d => {
    if (nibrsOffense.forEach) {
      let isSame = false
      nibrsOffense.forEach(o => {
        if (d.offense_name === o) isSame = true
      })
      return isSame
    }
    return d.offense_name === nibrsOffense
  })

  return {
    title: 'Offenses',
    data: reshape(offenseData, 'offense_name'),
  }
}

const getOffenseData = (data, offense) => {
  const nibrsOffense = offenseMapping[offense]
  const filteredData = [];
  for (const i in data) {
    if (nibrsOffense.indexOf(data[i].offense_name) > -1) {
      filteredData.push(data[i])
    }
  }
  return filteredData;
}

export const reshapeSexData = (data, offense) => {
  const filtered = getOffenseData(data, offense)
  let male = 0;
  let female = 0
  let unknown = 0
  for (const i in filtered) {
    male += filtered[i].male_count
    female += filtered[i].female_count
    unknown += filtered[i].unknown_count
  }
  const objs = [];
  const obj = {}
  obj.count = male
  obj.key = 'Male'
  objs.push(obj)
  obj.count = female
  obj.key = 'Female'
  objs.push(obj)
  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)
  return objs;
}

export const reshapeRaceData = (data, offense) => {
  const filtered = getOffenseData(data, offense)
  let americanIndian = 0;
  let asian = 0
  let black = 0
  let nativeHawaiian = 0
  let unknown = 0
  let white = 0

  for (const i in filtered) {
    asian += filtered[i].asian
    black += filtered[i].black
    white += filtered[i].white
    unknown += filtered[i].unknown
    nativeHawaiian += filtered[i].native_hawaiian
    americanIndian += filtered[i].american_indian
  }
  const objs = [];
  const obj = {}
  obj.count = americanIndian
  obj.key = 'American Indian or Alaska Native'
  objs.push(obj)

  obj.count = asian
  obj.key = 'Asian'
  objs.push(obj)

  obj.count = black
  obj.key = 'Black or African American'
  objs.push(obj)

  obj.count = white
  obj.key = 'White'
  objs.push(obj)

  obj.count = nativeHawaiian
  obj.key = 'Native Hawaiian or Pacific Islander'
  objs.push(obj)

  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)

  return objs;
}

export const reshapeEthnicityData = (data, offense) => {
  const filtered = getOffenseData(data, offense)
  let hispanic = 0;
  let mulitple = 0
  let notHispanic = 0
  let unknown = 0

  for (const i in filtered) {
    hispanic += filtered[i].hispanic
    mulitple += filtered[i].mulitple
    notHispanic += filtered[i].not_hispanic
    unknown += filtered[i].unknown
  }
  const objs = [];
  const obj = {}
  obj.count = hispanic
  obj.key = 'Hispanic or Latino'
  objs.push(obj)

  obj.count = notHispanic
  obj.key = 'Not Hispanic or Latino'
  objs.push(obj)


  obj.count = mulitple
  obj.key = 'Mulitple'
  objs.push(obj)

  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)

  return objs;
}


export const reshapeAgeData = (data, offense) => {
  const filtered = getOffenseData(data, offense)
  let range09 = 0;
  let range1019 = 0
  let range2029 = 0
  let range3039 = 0
  let range4049 = 0
  let range5059 = 0
  let range6069 = 0
  let range7079 = 0
  let range8089 = 0
  let range9099 = 0


  for (const i in filtered) {
    range09 += filtered[i].range_0_9
    range1019 += filtered[i].range_10_19
    range2029 += filtered[i].range_20_29
    range3039 += filtered[i].range_30_39
    range4049 += filtered[i].range_40_49
    range5059 += filtered[i].range_50_59
    range6069 += filtered[i].range_60_69
    range7079 += filtered[i].range_70_79
    range8089 += filtered[i].range_80_89
    range9099 += filtered[i].range_90_99
  }

  const objs = [];
  const obj = {}
  obj.count = range9099
  obj.key = '90-99'
  objs.push(obj)

  obj.count = range8089
  obj.key = '80-89'
  objs.push(obj)

  obj.count = range7079
  obj.key = '70-79'
  objs.push(obj)

  obj.count = range6069
  obj.key = '60-69'
  objs.push(obj)

  obj.count = range5059
  obj.key = '50-59'
  objs.push(obj)

  obj.count = range4049
  obj.key = '40-49'
  objs.push(obj)

  obj.count = range3039
  obj.key = '30-39'
  objs.push(obj)

  obj.count = range2029
  obj.key = '20-29'
  objs.push(obj)

  obj.count = range1019
  obj.key = '10-19'
  objs.push(obj)

  obj.count = range09
  obj.key = '10-19'
  objs.push(obj)
  return objs;
}


export const rename = (data, lookup) =>
  data.map(d => ({ key: lookup[d.key], count: d.count }))

export const binAge = data => {
  const cts = {}
  data.forEach(d => {
    const binNum = Math.floor(+d.key / 10) * 10
    const [binStart, binEnd] = [binNum, binNum + 9]
    const binKey = `${binStart}-${binEnd}`

    if (isNaN(binNum)) return
    if (!cts[binKey]) cts[binKey] = { binStart, binEnd, count: d.count }
    else cts[binKey].count += d.count
  })

  return Object.keys(cts).map(key => ({ key, ...cts[key] }))
}

// nibrs cards

const offenderDemo = (data, offense) => {
  const {
    offenderAge,
    offenderEthnicity,
    offenderRace,
    offenderSex,
  } = data


  const obj = {
    title: 'Offender demographics',
    data: [
      {
        data: reshapeSexData(offenderSex, offense),
        noun: 'offender',
        sentenceStart: 'Sex',
        title: 'Sex of offender',
        type: 'stacked',
        keys: Object.values(sexCodes),
      },
      {
        data: reshapeAgeData(offenderAge, offense),
        noun: 'offender',
        title: 'Age of offender',
        type: 'histogram',
        xLabel: 'Offender Age',
      },
      {
        data: reshapeRaceData(offenderRace, offense),
        noun: 'offender',
        title: 'Race of offender',
        type: 'table',
        sentenceStart: 'Race',
      },
      {
        data: reshapeEthnicityData(offenderEthnicity, offense),
        noun: 'offender',
        title: 'Ethnicity of offender',
        type: 'table',
        sentenceStart: 'Ethnicity',
      },
    ],
  }
  return obj;
}

const victimDemo = (data, offense) => {
  const { victimAge, victimEthnicity, victimRace, victimSex, victimLocation } = data

  const obj = {
    title: 'Victim demographics',
    data: [
      {
        data: reshapeSexData(victimSex, offense),
        noun: 'victim',
        sentenceStart: 'Sex',
        title: 'Sex of victim',
        type: 'stacked',
        keys: Object.values(sexCodes),
      },
      {
        data: reshapeAgeData(victimAge, offense),
        noun: 'victim',
        title: 'Age of victim',
        type: 'histogram',
        xLabel: 'Victim Age',
      },
      {
        data: reshapeRaceData(victimRace, offense),
        noun: 'victim',
        title: 'Race of victim',
        type: 'table',
        sentenceStart: 'Race',
      },
      {
        data: reshapeEthnicityData(victimEthnicity, offense),
        noun: 'victim',
        title: 'Ethnicity of victim',
        type: 'table',
        sentenceStart: 'Ethnicity',
      },
    ],
  }
  return obj;
}

const cleanRelationshipLabels = r => {
  if (!r.offender_relationship) return r
  const reg = new RegExp('victim was', 'gi')

  return {
    ...r,
    offender_relationship: r.offender_relationship.replace(reg, '').trim(),
  }
}

const relationships = data => {
  const { victimRelationship } = data

  const relationshipData = victimRelationship.map(cleanRelationshipLabels)

  return {
    title: 'Victim’s relationship to the offender',
    data: [
      {
        data: reshape(relationshipData, 'offender_relationship'),
        sortByValue: true,
        type: 'table',
        sentenceStart: 'The victim’s relationship to the offender',
      },
    ],
  }
}

const cleanLocationLabels = l => ({
  ...l,
  location_name: locationNameMapping[l.location_name],
})

const locations = data => {
  const { offenseLocationName } = data
  const locationData = offenseLocationName.map(cleanLocationLabels)

  return {
    title: 'Location type',
    data: [
      {
        data: reshape(locationData, 'location_name'),
        sortByValue: true,
        type: 'table',
        sentenceStart: 'Location type',
      },
    ],
  }
}
const parseNibrsCounts = (data, offense) => [
  offenderDemo(data, offense),
  victimDemo(data, offense),
  // relationships(data),
  // locations(data),
  offenses(data, offense),
]

export default parseNibrsCounts
