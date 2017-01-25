import { Link } from 'react-router'
import React from 'react'
import startCase from 'lodash.startcase'

const Breadcrumbs = ({ crime, place }) => {
  const links = [
    ['/explorer', 'Explorer'],
    [`/explorer/${place}`, startCase(place)],
    [`/explorer/${place}/${crime}`, startCase(crime)],
  ]

  return (
    <ul className='breadcrumbs list-reset mt0 mb4 h5'>
      {links.map((link, i) => (
        <li key={i}>
          <Link
            to={link[0]}
            className={`titlecase blue ${i === 2 ? 'bold' : ''}`}
          >
            {link[1]}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Breadcrumbs
