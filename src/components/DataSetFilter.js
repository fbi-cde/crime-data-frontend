import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'

import {
  specializedDataSets,
  vawDataSetCrimes
} from '../util/specializedDataSet'
import { slugify } from '../util/text'

const dataSetsCat = [
  {
    title: 'Violence Against Women',
    id: 'violence-against-women',
    options: vawDataSetCrimes
  }
]

const DataSetFilter = ({ ariaControls, onChange, selected, page }) => (
  <div id="specialized-data-set" className="mb4">
    <div className="mb3 fs-22 bold border-bottom border-blue-light">
      Specialized Crime Data
    </div>
    {dataSetsCat.map((c, i) => (
      <div className="mb2 rounded overflow-hidden" key={i}>
        {c.title && (
          <div className="mb1 sm-m0 px1 sm-lh-30 bold">{c.title}</div>
        )}
        <div>
          {c.options.map(o => {
            const id = o.id || slugify(o)
            const isActive = id === slugify(selected) && page === 'dataset'
            const single = c.options.length === 1

            return (
              <label
                key={`${o.id}-${o.dataset}`}
                className={`block cursor-pointer hover-bg-blue-light rounded
                  ${isActive ? 'bg-blue white bold hover-blue rounded' : ''}
                  ${single ? 'bold px2' : 'px3 sm-lh-30'}`}
                htmlFor={`${o.id}-${o.dataset}`}
              >
                <input
                  aria-controls={ariaControls}
                  className="hide"
                  checked={isActive}
                  id={`${o.id}-${o.dataset}`}
                  name="dataset"
                  onChange={e =>
                    onChange({
                      pageType: o.dataset,
                      page: 'dataset',
                      param: o.id
                    })
                  }
                  type="radio"
                  value={o.id}
                />
                {o.text || o}
              </label>
            )
          })}
        </div>
      </div>
    ))}
    <br />
    <Link className="px2 underline" to="/downloads-and-docs">
      Additional datasets
    </Link>
  </div>
)

DataSetFilter.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
  page: PropTypes.string.isRequired
}

DataSetFilter.defaultProps = {
  selected: ''
}

export default DataSetFilter
