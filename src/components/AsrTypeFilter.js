import PropTypes from 'prop-types'
import React from 'react'

import { asrTypes } from '../util/asr'
import { slugify } from '../util/text'

class AsrTypeFilter extends React.Component {
  generateSelections() {
    const opts = [];
    Object.keys(asrTypes).forEach(p => {
      const isActive = asrTypes[p].id === slugify(this.props.selected)
      opts.push(
        <label
          key={asrTypes[p].id}
          className={`block cursor-pointer hover-bg-blue-light rounded px3 sm-lh-30
              ${isActive ? 'bg-blue white bold hover-blue rounded px3 sm-lh-30' : ''}`}
          htmlFor={asrTypes[p].id}
        >
          <input
            aria-controls={this.props.ariaControls}
            className="hide"
            checked={isActive}
            id={asrTypes[p].id}
            name="crime"
            type="radio"
            onChange={e => this.props.onChange({ pageType: e.target.value, page: 'asr' })}
            value={asrTypes[p].id}
          />
          {asrTypes[p].text}
        </label>)
    });

    return opts;
  }

  render() {
    const selection = this.generateSelections()

    return (<div id="type-of-asr" className="mb4">
      <div className="mb3 fs-15 bold border-bottom border-blue-light">
         Arrest Data
      </div>
      <div>
        {selection}
      </div>
    </div>)
  }
}
AsrTypeFilter.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
}

AsrTypeFilter.defaultProps = {
  selected: '',
}

export default AsrTypeFilter
