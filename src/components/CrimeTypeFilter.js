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
  'Aggravated assualt',
]

const CrimeTypeFilter = ({ onChange, selected }) => {
  const handleChange = e => onChange({ crime: e.target.value })
  const selectedSlug = slugify(selected)
  return (
    <div id='type-of-crime' className='mb3'>
      <div className='mb2 pb-tiny h5 caps bold border-bottom'>
        Type of crime
      </div>
      <div className='mb2'>
        {violentCrime.map((o, i) => (
          <label className='block' key={i} htmlFor={slugify(o)}>
            <input
              checked={slugify(o) === slugify(selected)}
              className='mr1'
              id={slugify(o)}
              name='crime'
              onChange={handleChange}
              type='radio'
              value={slugify(o)}
            />
            {o}
          </label>
        ))}
      </div>
      <div className='mb2'>
        {propertyCrime.map((o, i) => (
          <label className='block' key={i} htmlFor={slugify(o)}>
            <input
              checked={slugify(o) === slugify(selected)}
              className='mr1'
              id={slugify(o)}
              name='crime'
              onChange={handleChange}
              type='radio'
              value={slugify(o)}
            />
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
