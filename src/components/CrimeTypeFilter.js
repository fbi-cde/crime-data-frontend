import React from 'react'

import { slugify } from '../util/text'

const propertyCrime = [
  'All property crime',
  'Burglary',
]

const violentCrime = [
  'All violent crime',
  'Murder',
  'Rape',
  'Robbery',
  'Aggravated assult',
]

const CrimeTypeFilter = ({ onChange, selected }) => {
  const handleChange = e => {
    const value = slugify(e.target.value)
    onChange({ id: 'state', value })
  }
  return (
    <div id='type-of-crime' className='mb3'>
      <div className='mb2 pb-tiny h5 caps bold border-bottom'>
        Type of crime
      </div>
      <div className='mb2'>
        {violentCrime.map((o, i) => (
          <label className='block' key={i} htmlFor='violent-crime'>
            <input
              className='mr1'
              name='violent-crime'
              type='radio'
              value={slugify(o)}
            />
            {o}
          </label>
        ))}
      </div>
      <div className='mb2'>
        {propertyCrime.map((o, i) => (
          <label className='block' key={i} htmlFor='property-crime'>
            <input className='mr1' type='radio' name='property-crime' value={slugify(o)} />
            {o}
          </label>
        ))}
      </div>
    </div>
  )
}

CrimeTypeFilter.defaultProps = {
  selected: '',
}

export default CrimeTypeFilter
