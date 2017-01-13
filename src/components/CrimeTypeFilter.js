import React from 'react'

import FilterGroup from './FilterGroup'

const otherCrime = [
  'Hate Crime',
  'Human Trafficking',
  'Law Enforcement Officers Killed and Assaulted (LEOKA)',
]

const propertyCrime = [
  'All Property Crime',
  'Arson',
  'Burglary',
  'Cargo Theft',
  'Larceny Theft',
  'Motor Vehicle Theft',
]

const violentCrime = [
  'All Violent Crime',
  'Murder',
  'Rape',
  'Robbery',
  'Aggravated Assault',
]

const CrimeTypeFilter = ({ onChange, selected }) => (
  <div id='type-of-crime' className='mb4'>
    <h3 className='mt0 mb2 pb-tiny border-bottom'>Type of crime</h3>
    <FilterGroup
      title='Violent Crime'
      options={violentCrime}
      onChange={onChange}
      selected={selected}
    />
    <FilterGroup
      title='Property Crime'
      options={propertyCrime}
      onChange={onChange}
      selected={selected}
    />
    {otherCrime.map((o, i) => (
      <FilterGroup
        key={i}
        options={[o]}
        onChange={onChange}
        selected={selected}
      />
    ))}
  </div>
)

CrimeTypeFilter.defaultProps = {
  selected: '',
}

export default CrimeTypeFilter
