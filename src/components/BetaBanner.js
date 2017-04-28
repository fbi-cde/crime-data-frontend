/* eslint-disable max-len */

import React from 'react'

import { showFeedback } from '../actions/feedback'

const BetaBanner = ({ dispatch }) => (
  <div className='md-absolute top-0 right-0 fs-10 md-fs-16'>
    <div className='md-mr2 p1 md-py2 md-pl3 md-pr4 md-inline-block md-rounded-bottom bg-red white'>
      <svg
        className="mr1 align-tb xs-hide"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="#fff"
      >
        <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z" />
      </svg>
      <span className="bold">This site is in beta.</span>{' '}
      Help us make it better:{' '}
      <button
        className='btn p0'
        onClick={() => dispatch(showFeedback())}
      >
        Submit feedback
      </button>
    </div>
  </div>
)

BetaBanner.propTypes = {
  dispatch: React.PropTypes.func,
}

export default BetaBanner
