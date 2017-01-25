import React from 'react'
import { Link } from 'react-router'

const isExplorerActive = location => (
  location.pathname === '/' || location.pathname.includes('explorer')
)

const active = {
  borderBottom: '3px solid #ff5e50',
  paddingBottom: '1px',
}

const Header = ({ location }) => (
  <header className='flex items-center bg-blue white' style={{ height: 128 }}>
    <div className='md-flex flex-auto items-baseline px2 sm-px6'>
      <div className='flex-auto'>
        <div className='inline-block'>
          <span className='mb1 h6 caps bold line-height-1 blue-gray'>
            Federal Bureau of Investigation
          </span>
          <br />
          <span className='h2 serif line-height-1'>Crime Data Explorer</span>
        </div>
      </div>
      <div className='mxn1 mt1 md-m0 truncate'>
        <Link
          to='/'
          className='mx1 h4 white'
          style={(isExplorerActive(location) && active) || {}}
        >
          Explorer
        </Link>
        <Link
          to='/downloads-and-docs'
          className='mx1 h4 white'
          activeStyle={active}
        >
          Downloads & Documentation
        </Link>
        <Link
          to='/about'
          className='mx1 h4 white'
          activeStyle={active}
        >
          About
        </Link>
      </div>
    </div>
  </header>
)

export default Header
