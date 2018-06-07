import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'

import { specializedDataSets, dataSets } from '../util/specializedDataSet'
import { slugify } from '../util/text'

const DataSetFilter = ({ ariaControls, onChange, selected }) => (
  <div id="specialized-data-set" className="mb4">
    <div className="mb3 fs-22 bold border-bottom border-blue-light">
      Specialized data set
    </div>

    {dataSets.map(o => {
      const id = o.id || slugify(o)
      const isActive = id === slugify(selected)

      console.log('o', o)
      return (
        <label
          key={o.id}
          className={`block cursor-pointer hover-bg-blue-light rounded px3 sm-lh-30'
              ${isActive ? 'bg-blue white bold hover-blue rounded' : ''}}`}
          htmlFor={o.id}
        >
          <input
            aria-controls={ariaControls}
            className="hide"
            checked={isActive}
            id={o.id}
            name="dataset"
            onChange={e =>
              onChange({ pageType: e.target.value, page: 'dataset' })
            }
            type="radio"
            value={o.id}
          />
          {o.text || o}
        </label>
      )
    })}
    <br />
    <Link className="px2 underline" to="/downloads-and-docs">
      Additional datasets
    </Link>
  </div>
)

DataSetFilter.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string
}

DataSetFilter.defaultProps = {
  selected: ''
}

export default DataSetFilter
