import React from 'react'

import { showTerm } from '../actions/glossaryActions'

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
      role='button'
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
  dispatch: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
}

export default Term
