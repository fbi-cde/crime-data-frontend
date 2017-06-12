import PropTypes from 'prop-types'
import React from 'react'

const Highlight = ({ text }) => <span className="bold blue">{text}</span>

Highlight.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Highlight
