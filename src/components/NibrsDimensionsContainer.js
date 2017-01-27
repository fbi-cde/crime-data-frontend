import React from 'react'

import IncidentDetailCard from './IncidentDetailCard'

import {
  detailLocationData,
  detailOffenderAge,
  detailOffenderRace,
  detailOffenderSex,
  detailRelationshipData,
 } from '../util/data'

const demoData = who => ([
  {
    data: detailOffenderAge,
    title: (who) ? `Age of ${who}` : undefined,
    type: 'histogram',
  },
  {
    data: detailOffenderRace,
    title: (who) ? `Race of ${who}` : undefined,
    type: 'table',
  },
  {
    data: detailOffenderSex,
    title: (who) ? `Sex of ${who}` : undefined,
    type: 'table',
  },
])

const locationData = [
  {
    data: detailLocationData,
    type: 'table',
  },
]

const detailOffenderDemographicsData = demoData('offender')
const detailVictimDemographicsData = demoData('victim')

const sexCodes = {
  F: 'Female',
  M: 'Male',
  U: 'Unknown',
}

const reduceSexCode = data => {
  const reduced = data.reduce((a, next) => {
    if (a[next.sex_code]) a[next.sex_code] += next.count
    else a[next.sex_code] = next.count
    console.log('a', a)
    return a
  }, {})

  return Object.keys(reduced).map(d => ({
    key: sexCodes[d] || d,
    count: reduced[d],
  }))
}

const reduceRelationshipData = data => {
  console.log('data', data)
  const reduced = data.reduce((a, next) => {
    if (a[next.offender_relationship]) a[next.offender_relationship] += next.count
    else a[next.offender_relationship] = next.count
    return a
  }, {})

  return Object.keys(reduced).map(d => ({
    key: d,
    count: reduced[d],
  }))
}

const NibrsDimensionsContainer = ({ data, loading }) => {
  if (loading) return (<h1>Loading</h1>)

  const relationshipData = [
    {
      data: reduceRelationshipData(data.victimRelationship || []),
      type: 'table',
    },
  ]

  return (
    <div className='lg-col lg-col-6 mb2 px1'>
      <IncidentDetailCard
        data={relationshipData}
        title='Victims relationship to offender'
      />
    </div>
  )

  // return (
  //   <div className='clearfix mxn1'>
  //     <div className='lg-col lg-col-6 mb2 px1'>
  //       <IncidentDetailCard
  //         data={detailOffenderDemographicsData}
  //         title='Offender demographics'
  //       />
  //     </div>
  //     <div className='lg-col lg-col-6 mb2 px1'>
  //       <IncidentDetailCard
  //         data={detailVictimDemographicsData}
  //         title='Victim demographics'
  //       />
  //     </div>
  //     <div className='lg-col lg-col-6 mb2 px1'>
  //       <IncidentDetailCard
  //         data={relationshipData}
  //         title='Victims relationship to offender'
  //       />
  //     </div>
  //     <div className='lg-col lg-col-6 mb2 px1'>
  //       <IncidentDetailCard
  //         data={locationData}
  //         title='Location type'
  //       />
  //     </div>
  //   </div>
  // )
}

export default NibrsDimensionsContainer
