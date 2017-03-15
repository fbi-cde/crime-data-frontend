import React from 'react'
import { Link } from 'react-router'

import { nationalKey } from '../util/usa'

const isHome = loc => loc.pathname === '/'
const isExplorer = loc => loc.pathname.includes('explorer')

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.toggleMenu = ::this.toggleMenu
  }

  toggleMenu(e) {
    e.preventDefault()
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { location } = this.props
    const { isOpen } = this.state
    const active = { borderBottom: '3px solid #ff5e50', paddingBottom: '1px' }

    return (
      <header className='pt3 pb2 md-p0 flex items-center bg-blue white'>
        <div className='md-flex flex-auto items-baseline container-big mx-auto px2'>
          <div className='flex-auto'>
            <div className='right md-hide lg-hide'>
              <button
                className='bg-transparent block bold border-none caps fs-12 red-bright'
                onClick={this.toggleMenu}
              >
                {isOpen ? 'Close' : 'Menu'}
              </button>
            </div>
            <div className='inline-block'>
              <span
                className='mb1 fs-10 md-fs-12 caps bold line-height-1 blue-gray block'
              >
                Federal Bureau of Investigation
              </span>
              <Link to='/' className='fs-24 md-fs-32 serif line-height-1 white'>
                Crime Data Explorer
              </Link>
            </div>
          </div>
          <div className={`mt2 md-m0 pt2 md-m0 header-nav ${isOpen ? 'open' : ''}`}>
            <ul className='list-reset my0 mxn2'>
              <li className='mb1 md-m0'>
                <Link
                  to='/'
                  className='mx2 fs-14 md-fs-18 white'
                  style={isHome(location) ? active : {}}
                >
                  Home
                </Link>
              </li>
              <li className='mb1 md-m0'>
                <Link
                  to='/about'
                  className='mx2 fs-14 md-fs-18 white'
                  activeStyle={active}
                >
                  About
                </Link>
              </li>
              <li className='mb1 md-m0'>
                <Link
                  to={`/explorer/${nationalKey}/violent-crime`}
                  className='mx2 fs-14 md-fs-18 white'
                  style={isExplorer(location) ? active : {}}
                >
                  Explorer
                </Link>
              </li>
              <li className='mb1 md-m0'>
                <Link
                  to='/downloads-and-docs'
                  className='mx2 fs-14 md-fs-18 white'
                  activeStyle={active}
                >
                  Downloads & Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
