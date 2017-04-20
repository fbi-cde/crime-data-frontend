import React from 'react'
import { Link } from 'react-router'

import FilterGroup from './FilterGroup'
import { crimeTypes } from '../util/offenses'


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
      Additional datasets
    </Link>
  </div>
)

CrimeTypeFilter.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  selected: React.PropTypes.string,
}

CrimeTypeFilter.defaultProps = {
  selected: '',
}

export default CrimeTypeFilter
