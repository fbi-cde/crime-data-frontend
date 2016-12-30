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
      className='btn mx1 p0 bg-navy white align-baseline'
      onClick={handler}
      role='button'
    >
      {children}
    </button>
  )
}

Term.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
}

export default Term
