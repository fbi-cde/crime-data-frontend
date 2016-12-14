import React from 'react'
import { Link } from 'react-router'

const Navigation = () => (
  <nav className='clearfix py2 bg-blue white'>
    <div className='container'>
      <div className='sm-col'>
        <h2 className='h5 caps'>Crime Data Explorer</h2>
      </div>
      <div className='sm-col-right'>
        <Link to='/'className='btn py2'>Explorer</Link>
        <Link to='/downloads-and-documentation' className='btn py2'>Downloads & Documentation</Link>
        <Link to='/about' className='btn py2'>About</Link>
      </div>
    </div>
  </nav>
)

export default Navigation
