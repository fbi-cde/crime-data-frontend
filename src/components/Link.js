import React from 'react'
import { Link as RouterLink } from 'react-router'

const Link = props => {
  const { to } = props
  let el = <RouterLink {...props}>{props.children}</RouterLink>

  if (to.includes('http://') || to.includes('https://')) {
    el = <a href={to} {...props}>{props.children}</a>
  }

  return el
}

export default Link
