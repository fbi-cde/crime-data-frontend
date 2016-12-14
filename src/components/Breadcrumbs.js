import { Link } from 'react-router'
import React from 'react'

const Breadcrumbs = props => {
  const { crime, state } = props.params
  return (
    <ul className='breadcrumbs clearfix list-style-none px0'>
      <li className='left mr2'>
        <Link to='/explorer'>Explorer</Link>
      </li>
      <li className='left mr2'>
        <Link to={`/explorer/${state}`} className='titlecase'>
          { state }
        </Link>
      </li>
      <li className='left'>
        <Link to={`/explorer/${state}/${crime}`} className='titlecase'>
          { crime }
        </Link>
      </li>
    </ul>
  )
}

export default Breadcrumbs
