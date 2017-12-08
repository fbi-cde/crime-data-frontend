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
  console.log('data[key]', data, key)
  const counts = data.reduce((a, b) => {
    console.log('a[b[key]]:', a[b])
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
  console.log('OffenseData:', offense)
  const nibrsOffense = offenseMapping[offense]
  console.log('nibrsOffense:', nibrsOffense)
  const filteredData = [];
  for (const i in data) {
    if (nibrsOffense.indexOf(data[i].offense_name) > -1) {
      filteredData.push(data[i])
    }
  }
  return filteredData;
}

export const reshapeSexData = (data, offense) => {
  console.log('reshapeSexData', data, offense)
  const filtered = getOffenseData(data, offense)
  console.log('Filtered By Offense:', filtered)
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
  console.log('Objs:', objs)
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
        data: binAge(reshape(offenderAge, 'age_num')),
        noun: 'offender',
        title: 'Age of offender',
        type: 'histogram',
        xLabel: 'Offender Age',
      },
      {
        data: rename(reshape(offenderRace, 'race_code'), raceCodes),
        noun: 'offender',
        title: 'Race of offender',
        type: 'table',
        sentenceStart: 'Race',
      },
      {
        data: reshape(offenderEthnicity, 'ethnicity'),
        noun: 'offender',
        title: 'Ethnicity of offender',
        type: 'table',
        sentenceStart: 'Ethnicity',
      },
    ],
  }
    console.log('Offender Demo:', obj)
  return obj;
}

const victimDemo = data => {
  const { victimAge, victimEthnicity, victimRace, victimSex } = data

  const obj = {
    title: 'Victim demographics',
    data: [
      {
        data: rename(reshape(victimSex, 'sex_code'), sexCodes),
        noun: 'victim',
        sentenceStart: 'Sex',
        title: 'Sex of victim',
        type: 'stacked',
        keys: Object.values(sexCodes),
      },
      {
        data: binAge(reshape(victimAge, 'age_num')),
        noun: 'victim',
        title: 'Age of victim',
        type: 'histogram',
        xLabel: 'Victim Age',
      },
      {
        data: rename(reshape(victimRace, 'race_code'), raceCodes),
        noun: 'victim',
        title: 'Race of victim',
        type: 'table',
        sentenceStart: 'Race',
      },
      {
        data: reshape(victimEthnicity, 'ethnicity'),
        noun: 'victim',
        title: 'Ethnicity of victim',
        type: 'table',
        sentenceStart: 'Ethnicity',
      },
    ],
  }
  console.log('victimDemo:', victimDemo)
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
  victimDemo(data),
  relationships(data),
  locations(data),
  offenses(data, offense),
]

export default parseNibrsCounts
