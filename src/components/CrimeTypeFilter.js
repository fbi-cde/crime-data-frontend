import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'

import { crimeTypes } from '../util/offenses'
import { slugify } from '../util/text'

const { violentCrime, propertyCrime } = crimeTypes

const crimes = [
  {
    title: 'Violent Crime',
    options: violentCrime
  },
  {
    title: 'Property Crime',
    options: propertyCrime
  }
]

const CrimeTypeFilter = ({ ariaControls, onChange, selected }) => (
  <div id="type-of-crime" className="mb4">
    <div className="mb3 fs-22 bold border-bottom border-blue-light">
      Type of crime
    </div>

    {crimes.map((c, i) => (
      <div className="mb2 rounded overflow-hidden" key={i}>
        {c.title && (
          <div className="mb1 sm-m0 px2 sm-lh-30 bold">{c.title}</div>
        )}
        <div>
          {c.options.map((o, ii) => {
            const id = o.id || slugify(o)
            const isActive = id === slugify(selected)
            const single = c.options.length === 1
            return (
              <label
                key={ii}
                className={`block cursor-pointer hover-bg-blue-light rounded
                    ${isActive ? 'bg-blue white bold hover-blue rounded' : ''}
                    ${single ? 'bold px2' : 'px3 sm-lh-30'}`}
                htmlFor={id}
              >
                <input
                  aria-controls={ariaControls}
                  className="hide"
                  checked={isActive}
                  id={id}
                  name="crime"
                  onChange={e =>
                    onChange({ pageType: e.target.value, page: 'crime' })
                  }
                  type="radio"
                  value={id}
                />
                {o.text || o}
              </label>
            )
          })}
        </div>
      </div>
    ))}
  </div>
)

CrimeTypeFilter.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string
}

CrimeTypeFilter.defaultProps = {
  selected: ''
}

export default CrimeTypeFilter
