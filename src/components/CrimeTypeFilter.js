import React from 'react'

import { slugify } from '../util/text'

const otherCrime = [
  'Hate Crime',
  'Human Trafficking',
  'Law Enforcement Officers Killed and Assaulted (LEOKA)',
]

const propertyCrime = [
  'All property crime',
  'Arson',
  'Burglary',
  'Cargo Theft',
  'Larceny Theft',
  'Motor Vehicle Theft',
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
  return (
    <div id='type-of-crime' className='mb4'>
      <h3 className='mt0 mb2 pb-tiny border-bottom'>Type of crime</h3>
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
      {otherCrime.map((o, i) => (
        <div key={i} className='mb2'>
          <label className='block' htmlFor={slugify(o)}>
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
        </div>
      ))}
    </div>
  )
}

CrimeTypeFilter.defaultProps = {
  selected: '',
}

export default CrimeTypeFilter
