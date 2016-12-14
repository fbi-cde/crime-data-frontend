import React from 'react'
import { Link } from 'react-router'

const Navigation = () => (
  <nav className='clearfix py2 bg-navy white'>
    <div className='container px2'>
      <div className='sm-col'>
        <h2 className='m0 lh-32p'>Crime Data Explorer</h2>
      </div>
      <div className='sm-col-right mxn1 lh-32p'>
        <Link to='/'className='px1 white'>Explorer</Link>
        <Link to='/downloads-and-documentation' className='px1 white'>Downloads</Link>
        <Link to='/about' className='px1 white'>About</Link>
      </div>
    </div>
  </nav>
)

export default Navigation
