import React from 'react'

import { slugify } from '../util/text'

const FilterGroup = ({ options, onChange, selected, title }) => {
  const handleChange = e => onChange({ crime: e.target.value })

  return (
    <div className='mb2 bg-blue-light rounded overflow-hidden'>
      {title && <div className='py1 px2 bg-darken-2 bold'>{title}</div>}
      <div>
        {options.map((o, i) => {
          const isActive = slugify(o) === slugify(selected)
          return (
            <label
              key={i}
              className={
                `py-tiny px2 block cursor-pointer ${isActive ? 'bg-navy white bold' : ''}`
              }
              htmlFor={slugify(o)}
            >
              <input
                className='hide'
                checked={isActive}
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
    </div>
  )
}

export default FilterGroup
