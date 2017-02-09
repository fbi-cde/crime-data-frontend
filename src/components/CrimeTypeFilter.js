import { Link } from 'react-router'
import React from 'react'

import FilterGroup from './FilterGroup'
import { crimeTypes } from '../util/data'

const { violentCrime, propertyCrime } = crimeTypes

const CrimeTypeFilter = ({ onChange, selected }) => (
  <div id='type-of-crime' className='mb4'>
    <div className='mb3 fs-22 bold border-bottom'>Type of crime</div>
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
