/* eslint no-console: 0 */

import React from 'react'

import { showTerm } from '../actions/glossaryActions'

const Term = ({ children, dispatch, id }) => {
  const handler = e => {
    e.preventDefault()
    dispatch(showTerm(id))
  }

  return (
    <button
      className='btn mx-tiny p0 align-baseline border-bottom-dotted'
      onClick={handler}
      role='button'
    >
      {children}
      <img className='ml-tiny' width='12' src='/img/book.svg' alt='glossary lookup' />
    </button>
  )
}

Term.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
}

export default Term
