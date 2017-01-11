import React from 'react'

import { slugify } from '../util/text'

const FilterGroup = ({ options, onChange, selected }) => {
  const handleChange = e => onChange({ crime: e.target.value })

  return (
    <div className='mb1 bg-light-blue rounded'>
      {options.map((o, i) => {
        const isActive = slugify(o) === slugify(selected)
        return (
          <label
            key={i}
            className={`py-tiny pl3 block radio ${isActive ? 'bg-darken-2' : ''}`}
            htmlFor={slugify(o)}
          >
            <input
              checked={isActive}
              id={slugify(o)}
              name='crime'
              onChange={handleChange}
              type='radio'
              value={slugify(o)}
            />
            <span className='mx1 my-tiny indicator' />
            {o}
          </label>
        )
      })}
    </div>
  )
}

export default FilterGroup
