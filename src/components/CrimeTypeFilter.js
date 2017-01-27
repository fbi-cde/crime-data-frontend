import { Link } from 'react-router'
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
    <h3 className='fs1 sans-serif mt0 mb3 pb-tiny border-bottom'>
      Type of crime
    </h3>
    <FilterGroup
      name='crime'
      title='Violent Crime'
      options={violentCrime}
      onChange={onChange}
      selected={selected}
    />
    <FilterGroup
      name='crime'
      title='Property Crime'
      options={propertyCrime}
      onChange={onChange}
      selected={selected}
    />
    {otherCrime.map((o, i) => (
      <FilterGroup
        key={i}
        name='crime'
        options={[o]}
        onChange={onChange}
        selected={selected}
      />
    ))}
    <Link
      className='px2 underline'
      to='/downloads-and-docs'
    >
      Additional data sets
    </Link>
  </div>
)

CrimeTypeFilter.defaultProps = {
  selected: '',
}

export default CrimeTypeFilter
