import React from 'react'

import IncidentDetailCard from './IncidentDetailCard'

const raceCodes = {
  A: 'Asian',
  AP: 'Pacific Islander',
  B: 'Black',
  I: 'Native American',
  U: 'Unknown',
  W: 'White',
}

const sexCodes = {
  F: 'Female',
  M: 'Male',
  U: 'Unknown',
}

const reduceData = (data, key) => {
  const reduced = data.reduce((a, next) => {
    if (a[next[key]]) a[next[key]] += next.count
    else a[next[key]] = +next.count
    return a
  }, {})

  return Object.keys(reduced).map(d => ({
    key: d,
    count: reduced[d],
  }))
}

// const reduceAgeData = data => reduceData(data, 'age_num')
const reduceLocationData = data => reduceData(data, 'location_name')
const reduceRaceData = data => (
  reduceData(data, 'race_code').map(x => ({
    key: `${raceCodes[x.key]}`,
    count: x.count,
  }))
)
const reduceRelationshipData = data => (
  reduceData(data, 'offender_relationship')
)
const reduceSexData = data => (
  reduceData(data, 'sex_code').map(x => ({
    key: `${sexCodes[x.key]}`,
    count: x.count,
  }))
)

const NibrsDimensionsContainer = ({ data, loading }) => {
  if (loading) return (<h1>Loading</h1>)

  const relationshipData = [
    {
      data: reduceRelationshipData(data.victimRelationship || []),
      type: 'table',
    },
  ]

  const locationData = [
    {
      data: reduceLocationData(data.victimLocationName || []),
      type: 'table',
    },
  ]

  const offenderDemographicData = [
    // {
    //   data: reduceAgeData(data.offenderAgeNum || []),
    //   title: 'Age of offender',
    //   type: 'histogram',
    // },
    {
      data: reduceRaceData(data.offenderRaceCode || []),
      title: 'Race of offender',
      type: 'table',
    },
    {
      data: reduceSexData(data.offenderSexCode || []),
      title: 'Sex of offender',
      type: 'table',
    },
  ]

  const victimDemographicData = [
    // {
    //   data: reduceAgeData(data.offenderAgeNum || []),
    //   title: 'Age of offender',
    //   type: 'histogram',
    // },
    {
      data: reduceRaceData(data.victimRaceCode || []),
      title: 'Race of victim',
      type: 'table',
    },
    {
      data: reduceSexData(data.victimSexCode || []),
      title: 'Sex of victim',
      type: 'table',
    },
  ]

  return (
    <div className='clearfix mxn1'>
      <div className='lg-col lg-col-6 mb2 px1'>
        <IncidentDetailCard
          data={offenderDemographicData}
          title='Offender demographics'
        />
      </div>
      <div className='lg-col lg-col-6 mb2 px1'>
        <IncidentDetailCard
          data={victimDemographicData}
          title='Victim demographics'
        />
      </div>
      <div className='lg-col lg-col-6 mb2 px1'>
        <IncidentDetailCard
          data={relationshipData}
          title='Relationship of the victim to the offender'
        />
      </div>
      <div className='lg-col lg-col-6 mb2 px1'>
        <IncidentDetailCard
          data={locationData}
          title='Location name'
        />
      </div>
    </div>
  )
}

export default NibrsDimensionsContainer
