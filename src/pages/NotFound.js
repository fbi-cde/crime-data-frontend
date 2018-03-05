/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Link from '../components/Link'
import { showFeedback } from '../actions/feedback'

const NotFound = () =>
  <div className="container mb8 mx-auto px2 pt8">
    <Helmet title="CDE :: 404" />
    <h1 className="mt0 fs-40 col-12 sm-col-7">
      We couldn{"'"}t find the page you are looking for.
    </h1>
    <p className="m0 mb4 fs-24 serif">Please check the link and try again.</p>
    <Link to="/" className="btn btn-primary mb2 fs-18">
      Return home
    </Link>
    <p className="fs-18 serif">
      If you still can't find what you're looking for, please{' '}
    </p>
    <Link to="https://forms.fbi.gov/cde" className="btn btn-primary mb2 fs-18">
      Submit Feedback
    </Link>
    <p className="fs-18 serif">
      or contact us.
    </p>
  </div>

NotFound.propTypes = {
  actions: PropTypes.shape({
    showFeedback: PropTypes.func,
  }),
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ showFeedback }, dispatch),
})

export default connect(null, mapDispatchToProps)(NotFound)
