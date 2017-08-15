import PropTypes from 'prop-types'
import React from 'react'
import { Link as RouterLink } from 'react-router'

const Link = props => {
  const { children, to } = props

  let el = (
    <RouterLink {...props}>
      {children}
    </RouterLink>
  )
  if (to.includes('http://') || to.includes('https://')) {
    el = (
      <a href={to} {...props}>
        {children}
      </a>
    )
  }

  return el
}

Link.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default Link
