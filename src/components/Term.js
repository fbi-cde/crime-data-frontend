import React from 'react'

import { showTerm } from '../actions/glossary'


const Term = ({ children, dispatch, id }) => {
  const handler = e => {
    e.preventDefault()
    dispatch(showTerm(id))
  }

  return (
    <button
      className='btn p0 regular border-none border-bottom-dotted align-inherit line-height-3'
      onClick={handler}
    >
      {children}
      <img
        className='ml-tiny'
        width='9'
        src='/img/glossary.svg'
        alt='glossary lookup'
      />
    </button>
  )
}

Term.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
}

export default Term
