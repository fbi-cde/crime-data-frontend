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

const FilterGroup = ({ options, onChange, selected }) => {
  const handleChange = e => onChange({ crime: e.target.value })

  return (
    <div className='mb1 bg-light-blue rounded'>
      {options.map((o, i) => {
        const isActive = slugify(o) === slugify(selected)
        return (
          <label
            key={i}
            className={`py-tiny px2 block cursor-pointer ${isActive ? 'bg-darken-2' : ''}`}
            htmlFor={slugify(o)}
          >
            <input
              checked={isActive}
              className='mr1'
              id={slugify(o)}
              name='crime'
              onChange={handleChange}
              type='radio'
              value={slugify(o)}
            />
            {o}
          </label>
        )
      })}
    </div>
  )
}

const CrimeTypeFilter = ({ onChange, selected }) => (
  <div id='type-of-crime' className='mb4'>
    <h3 className='mt0 mb2 pb-tiny border-bottom'>Type of crime</h3>
    <FilterGroup
      options={violentCrime}
      onChange={onChange}
      selected={selected}
    />
    <FilterGroup
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
