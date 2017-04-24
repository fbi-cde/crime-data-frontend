import React from 'react'

import { slugify } from '../util/text'

const FilterGroup = ({ name, options, onChange, selected, title }) => {
  const handleChange = e => onChange({ crime: e.target.value })

  return (
    <div className="mb2 rounded overflow-hidden">
      {title && <div className="mb1 sm-m0 px2 sm-lh-30 bold">{title}</div>}
      <div>
        {options.map((o, i) => {
          const id = o.id || slugify(o)
          const isActive = id === slugify(selected)
          const single = options.length === 1
          return (
            <label
              key={i}
              className={`block cursor-pointer hover-bg-blue-light
                ${isActive ? 'bg-blue white bold hover-blue' : ''}
                ${single ? 'bold px2' : 'px3 sm-lh-30'}`}
              htmlFor={id}
            >
              <input
                className="hide"
                checked={isActive}
                id={id}
                name={name}
                onChange={handleChange}
                type="radio"
                value={id}
              />
              {o.text || o}
            </label>
          )
        })}
      </div>
    </div>
  )
}

const defaultOnChange = e =>
  /*  eslint no-console: 0 */
  console.log('default onChange in <FilterGroup />', e)

FilterGroup.defaultProps = {
  onChange: defaultOnChange,
  selected: '',
}

export default FilterGroup
