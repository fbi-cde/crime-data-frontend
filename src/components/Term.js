import PropTypes from 'prop-types'
import React from 'react'

import { showTerm } from '../actions/glossary'


const Term = ({ children, dispatch, id }) => {
  const handler = e => {
    e.preventDefault()
    dispatch(showTerm(id))
  }

  return (
    <a
      className='border-bottom-dotted'
      href='#!'
      onClick={handler}
    >
      {children}
      <img
        className='ml-tiny'
        width='9'
        src='/img/glossary.svg'
        alt='glossary lookup'
      />
    </a>
  )
}

Term.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default Term
