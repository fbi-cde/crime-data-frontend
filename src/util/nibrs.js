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

// data munging functions

const reshape = (data, key) => {
  const counts = data.reduce((a, b) => {
    a[b[key]] = (a[b[key]] || 0) + +b.count // eslint-disable-line no-param-reassign
    return a
  }, {})

  return Object.keys(counts).map(k => ({ key: k, count: counts[k] }))
}

const rename = (data, lookup) => (
  data.map(d => ({ key: lookup[d.key], count: d.count }))
)

// nibrs cards

const offenderDemo = data => {
  const { offenderAgeNum, offenderRaceCode, offenderSexCode } = data

  return {
    title: 'Offender demographics',
    data: [
      {
        data: reshape(offenderAgeNum, 'age_num'),
        title: 'Age of offender',
        type: 'histogram',
      },
      {
        data: rename(reshape(offenderRaceCode, 'race_code'), raceCodes),
        title: 'Race of offender',
        type: 'table',
      },
      {
        data: rename(reshape(offenderSexCode, 'sex_code'), sexCodes),
        title: 'Sex of offender',
        type: 'table',
      },
    ],
  }
}

const victimDemo = data => {
  const { victimAgeNum, victimRaceCode, victimSexCode } = data

  return {
    title: 'Victim demographics',
    data: [
      {
        data: reshape(victimAgeNum, 'age_num'),
        title: 'Age of victim',
        type: 'histogram',
      },
      {
        data: rename(reshape(victimRaceCode, 'race_code'), raceCodes),
        title: 'Race of victim',
        type: 'table',
      },
      {
        data: rename(reshape(victimSexCode, 'sex_code'), sexCodes),
        title: 'Sex of victim',
        type: 'table',
      },
    ],
  }
}

const relationships = data => {
  const { victimRelationship } = data

  return {
    title: 'Victim’s relationship to the offender',
    data: [
      {
        data: reshape(victimRelationship, 'offender_relationship'),
        type: 'table',
      },
    ],
  }
}

const locations = data => {
  const { victimLocationName } = data

  return {
    title: 'Location type',
    data: [
      {
        data: reshape(victimLocationName, 'location_name'),
        type: 'table',
      },
    ],
  }
}

const parseNibrs = data => ([
  offenderDemo(data),
  victimDemo(data),
  relationships(data),
  locations(data),
])

export default parseNibrs
