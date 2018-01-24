import PropTypes from 'prop-types'
import React from 'react'

import { leokaTypes } from '../util/leoka'
import { slugify } from '../util/text'

class LeokaTypeFilter extends React.Component {
  generateSelections() {
    const opts = [];
    Object.keys(leokaTypes).forEach(p => {
      const isActive = leokaTypes[p].id === slugify(this.props.selected)
      opts.push(
        <label
          key={leokaTypes[p].id}
          className={`block cursor-pointer hover-bg-blue-light rounded px3 sm-lh-30
              ${isActive ? 'bg-blue white bold hover-blue rounded px3 sm-lh-30' : ''}`}
          htmlFor={leokaTypes[p].id}
        >
          <input
            aria-controls={this.props.ariaControls}
            className="hide"
            checked={isActive}
            id={leokaTypes[p].id}
            name="crime"
            type="radio"
            onChange={e => this.props.onChange({ pageType: e.target.value, page: 'leoka' })}
            value={leokaTypes[p].id}
          />
          {leokaTypes[p].text}
        </label>)
    });

    return opts;
  }

  render() {
    const selection = this.generateSelections()

    return (<div id="type-of-leoka" className="mb4">
      <div className="mb3 fs-15 bold border-bottom border-blue-light">
         Law Enforcement Officers Killed and Assaulted Data
      </div>
      <div>
        {selection}
      </div>
    </div>)
  }
}
LeokaTypeFilter.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
}

LeokaTypeFilter.defaultProps = {
  selected: '',
}

export default LeokaTypeFilter
