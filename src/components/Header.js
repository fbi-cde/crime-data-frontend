import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'

const isHome = loc => loc.pathname === '/'
const isExplorer = loc => loc.pathname.includes('explorer')
const active = { borderBottom: '3px solid #ff5e50', paddingBottom: '1px' }

class Header extends React.Component {
  state = { isOpen: false }

  toggleMenu = e => {
    e.preventDefault()
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { location } = this.props
    const { isOpen } = this.state

    return (
      <header className="pt3 pb2 md-p0 flex items-center bg-blue white">
        <div className="md-flex flex-auto items-baseline px2 md-px6">
          <div className="flex-auto">
            <div className="right md-hide lg-hide">
              <button
                className="block btn p0 line-height-1 caps fs-12 red-bright"
                onClick={this.toggleMenu}
              >
                {isOpen ? 'Close' : 'Menu'}
              </button>
            </div>
            <div className="inline-block">
              <span className="mb1 fs-10 md-fs-12 caps bold line-height-1 blue-light-508 block">
                Federal Bureau of Investigation
              </span>
              <Link to="/" className="fs-24 md-fs-32 serif line-height-1 white">
                Crime Data Explorer
              </Link>
            </div>
          </div>
          <div
            className={`mt2 md-m0 pt2 md-m0 header-nav ${isOpen ? 'open' : ''}`}
          >
            <ul className="list-reset my0 mxn1 lg-mxn2">
              <li className="mb1 md-m0">
                <Link
                  to="/"
                  className="mx1 lg-mx2 fs-14 md-fs-18 white"
                  style={isHome(location) ? active : {}}
                >
                  Home
                </Link>
              </li>
              <li className="mb1 md-m0">
                <Link
                  to={'/explorer/violent-crime'}
                  className="mx1 lg-mx2 fs-14 md-fs-18 white"
                  style={isExplorer(location) ? active : {}}
                >
                  Explorer
                </Link>
              </li>
              <li className="mb1 md-m0">
                <Link
                  to="/downloads-and-docs"
                  className="mx1 lg-mx2 fs-14 md-fs-18 white"
                  activeStyle={active}
                >
                  Downloads & Documentation
                </Link>
              </li>
              <li className="mb1 md-m0">
                <Link
                  to="/about"
                  className="mx1 lg-mx2 fs-14 md-fs-18 white"
                  activeStyle={active}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Header
