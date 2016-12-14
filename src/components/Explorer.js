import React from 'react'

import Breadcrumbs from './Breadcrumbs'

const Explorer = props => {
  const state = props.params.state

  return (
    <div className='container'>
      <div className='border-bottom clearfix pb2'>
        <Breadcrumbs {...props} />
        <span className='sm-col flex flex-center'>
          <h1 className='py0 my0 titlecase'>{ state }</h1>
        </span>
        <span className='sm-col-right flex flex-center'>
          <a className='btn'>Download this data</a>
          <a className='btn'>Share this page</a>
        </span>
      </div>
    </div>
  )
}

export default Explorer
