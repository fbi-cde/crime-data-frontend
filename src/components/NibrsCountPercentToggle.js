import PropTypes from 'prop-types'
import React from 'react'

const btn = 'btn btn-primary p0 ml-tiny line-height-4 sans-serif regular'

const NibrsCountPercentToggle = ({ isCounts, showCounts, showPercents }) =>
  <div className="mt-tiny fs-10 italic serif">
    View by
    <button
      className={`${btn} ${isCounts ? '' : 'bg-white blue border-blue'}`}
      onClick={showCounts}
      style={{ width: 18 }}
    >
      #
    </button>
    <button
      className={`${btn} ${isCounts ? 'bg-white blue border-blue' : ''}`}
      onClick={showPercents}
      style={{ width: 18 }}
    >
      %
    </button>
  </div>

NibrsCountPercentToggle.propTypes = {
  isCounts: PropTypes.bool.isRequired,
  showCounts: PropTypes.func.isRequired,
  showPercents: PropTypes.func.isRequired,
}

export default NibrsCountPercentToggle
