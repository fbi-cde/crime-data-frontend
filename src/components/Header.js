import React from 'react'
import { Link } from 'react-router'

const Header = () => (
  <header className='py3 bg-navy white'>
    <div className='md-flex items-baseline px2 md-px3'>
      <h2 className='flex-auto m0 serif regular'>Crime Data Explorer</h2>
      <div className='mxn1 mt1 md-m0'>
        <Link to='/'className='px1 white'>Explorer</Link>
        <Link to='/downloads-and-docs' className='px1 white'>
          Downloads & Documentation
        </Link>
        <Link to='/about' className='px1 white'>About</Link>
      </div>
    </div>
  </header>
)

export default Header
