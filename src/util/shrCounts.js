/* eslint-disable*/
const sexCodes = {
  F: 'Female',
  M: 'Male',
  U: 'Unknown',
  NRL: 'Not Reported',
}


// data munging functions

export const reshape = (data, key) => {
  const counts = data.reduce((a, b) => {
    a[b[key]] = (a[b[key]] || 0) + +b.count // eslint-disable-line no-param-reassign
    return a
  }, {})

  return Object.keys(counts).map(k => ({ key: k, count: counts[k] }))
}

export const reshapeSexData = (data, offense) => {
  const filtered = data
  let male = 0;
  let female = 0
  let unknown = 0
  let not_reported = 0
  for (const i in filtered) {
    male += filtered[i].male_count
    female += filtered[i].female_count
    unknown += filtered[i].unknown_count
    not_reported += filtered[i].not_reported

  }
  const objs = [];
  let obj = {}
  obj.count = male
  obj.key = 'Male'
  objs.push(obj)
  obj = {}
  obj.count = female
  obj.key = 'Female'
  objs.push(obj)
  obj = {}
  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)
  obj = {}
  obj.count = not_reported
  obj.key = 'Not Reported'
  objs.push(obj)
  return objs;
}

export const reshapeRaceData = (data, offense) => {
  const filtered = data
  let americanIndian = 0;
  let asian = 0
  let black = 0
  let nativeHawaiian = 0
  let unknown = 0
  let white = 0
  let not_reported = 0

  for (const i in filtered) {
    asian += filtered[i].asian
    black += filtered[i].black
    white += filtered[i].white
    unknown += filtered[i].unknown
    nativeHawaiian += filtered[i].native_hawaiian
    americanIndian += filtered[i].american_indian
    not_reported += filtered[i].not_reported
  }
  const objs = [];
  let obj = {}
  obj.count = americanIndian
  obj.key = 'American Indian or Alaska Native'
  objs.push(obj)
  obj = {}

  obj.count = asian
  obj.key = 'Asian'
  objs.push(obj)
  obj = {}

  obj.count = black
  obj.key = 'Black or African American'
  objs.push(obj)
  obj = {}

  obj.count = white
  obj.key = 'White'
  objs.push(obj)
  obj = {}

  obj.count = nativeHawaiian
  obj.key = 'Native Hawaiian or Pacific Islander'
  objs.push(obj)
  obj = {}

  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)
  obj = {}

  obj = {}
  obj.count = not_reported
  obj.key = 'Not Reported'
  objs.push(obj)

  return objs;
}

export const reshapeEthnicityData = (data, offense) => {
  const filtered = data
  let hispanic = 0;
  let multiple = 0
  let notHispanic = 0
  let unknown = 0
  let not_reported = 0

  for (const i in filtered) {
    hispanic += filtered[i].hispanic
    multiple += filtered[i].multiple
    notHispanic += filtered[i].not_hispanic
    unknown += filtered[i].unknown
    not_reported += filtered[i].not_reported
  }
  const objs = [];
  let obj = {}
  obj.count = hispanic
  obj.key = 'Hispanic or Latino'
  objs.push(obj)
  obj = {}

  obj.count = notHispanic
  obj.key = 'Not Hispanic or Latino'
  objs.push(obj)
  obj = {}

  obj.count = multiple
  obj.key = 'Multiple'
  objs.push(obj)
  obj = {}

  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)
  obj = {}

  obj = {}
  obj.count = not_reported
  obj.key = 'Not Reported'
  objs.push(obj)

  return objs;
}


export const reshapeAgeData = (data, offense) => {
  const filtered = data
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
  let unknown = 0;
  let not_reported = 0

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
    unknown += filtered[i].unknown
    not_reported += filtered[i].not_reported
  }

  const objs = [];
  let obj = {}
  obj.count = range9099
  obj.key = '90-99'
  objs.push(obj)
  obj = {}

  obj.count = range8089
  obj.key = '80-89'
  objs.push(obj)
  obj = {}

  obj.count = range7079
  obj.key = '70-79'
  objs.push(obj)
  obj = {}

  obj.count = range6069
  obj.key = '60-69'
  objs.push(obj)
  obj = {}

  obj.count = range5059
  obj.key = '50-59'
  objs.push(obj)
  obj = {}

  obj.count = range4049
  obj.key = '40-49'
  objs.push(obj)
  obj = {}

  obj.count = range3039
  obj.key = '30-39'
  objs.push(obj)
  obj = {}

  obj.count = range2029
  obj.key = '20-29'
  objs.push(obj)
  obj = {}

  obj.count = range1019
  obj.key = '10-19'
  objs.push(obj)
  obj = {}

  obj.count = range09
  obj.key = '0-9'
  objs.push(obj)
  obj = {}

  obj.count = unknown
  obj.key = 'Unknown'
  objs.push(obj)
  obj = {}

  obj = {}
  obj.count = not_reported
  obj.key = 'Not Reported'
  objs.push(obj)

  return objs;
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
        type: 'table',
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
  const { victimAge, victimEthnicity, victimRace, victimSex } = data

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
        type: 'table',
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


const parseSHRCardCounts = (data, offense) => [
  offenderDemo(data, offense),
  victimDemo(data, offense),
]

const createTrendData = (data) => {
  const victimData = data['victim']
  const offenderData = data['offender']
  let objs = [];
  let obj = {}
  for (const i in victimData) {
    obj = {}
    obj.year = victimData[i].data_year
    let victim = {};
    victim.count = victimData[i].count;
    victim.rate = victimData[i].count / 10000 * 10000;
    victim.crime = 'homicide'
    obj.victim=victim;
    let offender = {};
    offender.count = offenderData[i].count;
    offender.rate = offenderData[i].count / 10000 * 10000;
    offender.crime = 'homicide'
    obj.offender=offender;
    objs.push(obj)
  }
  return objs;

}

export {parseSHRCardCounts, createTrendData}
