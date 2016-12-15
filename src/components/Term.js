/* eslint no-console: 0 */

import React from 'react'

const showTerm = term => {
  const id = term.target.getAttribute('data-term')
  console.log(`fire off action to show ${id} in the glossary`)
}

const Term = props => {
  const id = props.id || props.children

  return (
    <button
      className='align-baseline btn border-bottom p0 underline'
      data-term={id}
      onClick={showTerm}
      role='button'
    >
      { props.children }
    </button>
  )
}

export default Term
