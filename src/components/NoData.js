import PropTypes from 'prop-types'
import React from 'react'

const NoData = ({ text }) => <div className="fs-18">{text}</div>

NoData.defaultProps = {
  text: 'There is no data at this time.',
}

NoData.propTypes = {
  text: PropTypes.string,
}

export default NoData
