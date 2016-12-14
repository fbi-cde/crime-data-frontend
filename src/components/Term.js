import React from 'react'

const showTerm = term => {
  const id = term.target.getAttribute('data-term')
  console.log(`fire off action to show ${id} in the glossary`)
}

const Term = props => {
  const id = props.id || props.children

  return (
    <span
      className='btn border-none border-bottom p0'
      data-term={id}
      onClick={showTerm}
    >
      { props.children }
    </span>
  )
}

export default Term
