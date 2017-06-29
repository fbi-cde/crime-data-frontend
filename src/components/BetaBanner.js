import PropTypes from 'prop-types'
import React from 'react'

const BetaBanner = ({ onFeedbackClick }) =>
  <div className="md-absolute md-col-6 top-0 right-0 fs-10 md-fs-14">
    <div className="md-mr2 p1 md-py2 md-pl3 md-pr4 md-inline-block md-rounded-bottom bg-red white">
      This site is under development and will be updated periodically. Feedback
      is welcome and will help us provide a better service.
      {' '}
      <button className="btn p0 line-height-1" onClick={onFeedbackClick}>
        Submit feedback
      </button>
    </div>
  </div>

BetaBanner.propTypes = {
  onFeedbackClick: PropTypes.func,
}

export default BetaBanner
