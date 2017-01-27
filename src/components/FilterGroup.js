import React from 'react'

import { slugify } from '../util/text'

const FilterGroup = ({ name, options, onChange, selected, title }) => {
  const handleChange = e => onChange({ crime: e.target.value })

  return (
    <div className='mb2 rounded overflow-hidden'>
      {title && <div className='py1 px2 bold'>{title}</div>}
      <div>
        {options.map((o, i) => {
          const isActive = slugify(o) === slugify(selected)
          const single = options.length === 1
          return (
            <label
              key={i}
              className={
                `py-tiny block cursor-pointer hover-bg-blue-light
                ${isActive ? 'bg-blue white bold hover-blue' : ''}
                ${single ? 'bold px2' : 'px3'}`
              }
              htmlFor={slugify(o)}
            >
              <input
                className='hide'
                checked={isActive}
                id={slugify(o)}
                name={name}
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
