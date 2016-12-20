import { Link } from 'react-router'
import React from 'react'

const Breadcrumbs = ({ params }) => {
  const { crime, state } = params
  const links = [
    ['/explorer', 'Explorer'],
    [`/explorer/${state}`, state],
    [`/explorer/${state}/${crime}`, crime],
  ]

  return (
    <ul className='breadcrumbs list-reset mt0 h5'>
      {links.map((link, i) => (
        <li key={i}>
          <Link to={link[0]} className='titlecase black'>{link[1]}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Breadcrumbs
