import PropTypes from 'prop-types'
import React from 'react'
import { Link as RouterLink } from 'react-router'

const Link = props => {
  const { children, to } = props

  if (to.includes('http://') || to.includes('https://')) {
    return <a href={to} {...props}>{children}</a>
  }

  return <RouterLink {...props}>{children}</RouterLink>
}

Link.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default Link
