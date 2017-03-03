import React from 'react'
import { Link } from 'react-router'

const scrollToTop = () => window.scrollTo(0, 0)
const links = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Explorer',
    href: '/explorer',
  },
  {
    text: 'Downloads & Documentation',
    href: '/downloads-and-docs',
  },
  {
    text: 'About',
    href: '/about',
  },
  {
    text: 'Glossary',
    href: '/#!',
  },
  {
    text: 'License',
    href: 'https://github.com/18F/crime-data-explorer/blob/master/LICENSE.md',
  },
  {
    text: 'Feedback',
    href: 'https://github.com/18F/crime-data-explorer/issues',
  },
]

const Footer = () => (
  <footer className='py6 bg-blue white'>
    <div className='container-big mx-auto px2'>
      <div className='mt1 mb4'>
        <span className='mb1 fs-10 md-fs-12 caps bold line-height-1 blue-gray block'>
          Federal Bureau of Investigation
        </span>
        <Link to='/' className='fs-24 md-fs-32 serif line-height-1 white'>
          Crime Data Explorer
        </Link>
      </div>
      <div className='clearfix mxn2'>
        <div className='md-col md-col-5 px2 mb3 md-m0'>
          <ul className='list-style-none m0 p0'>
            {links.map((l, i) => (
              <li key={i}>
                <Link
                  className='white caps fs-14'
                  onClick={scrollToTop}
                  to={l.href}
                >
                  {l.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='md-col md-col-5 px2 mb3 md-m0 fs-14 white'>
          <div className='mb1 bold fs-18 serif red-bright'>Contact us</div>
          <div className='mb3'>
            <div className='bold'>Criminal Justice Information Services (CJIS) Division</div>
            <a
              className='mr1 pr1 white border-white border-right'
              href='mailto:cjis_comm@leo.gov'
            >
              cjis_comm@leo.gov
            </a>
            <a
              className='white'
              href='tel:3046254995'
            >
              (304) 625-4995
            </a>
          </div>
          <div className='bold'>FBI Uniform Crime Reporting Program</div>
          <div>
            <span className='mr1 pr1 border-right border-white'>1000 Custer Hollow Road</span>
            <span>Clarksburg, WV 26306</span>
          </div>
        </div>
        <div className='md-col md-col-2 px2 fs-14'>
          <div className='mb1 bold fs-18 serif red-bright'>Follow us</div>
          <div className='mb2'>
            <img
              className='mr1 align-middle'
              width='20'
              src='/img/twitter.svg'
              alt='twitter'
            />
            <a className='white' href='https://twitter.com/fbi'>@FBI</a>
          </div>
          <div>
            <img
              className='mr1 align-middle'
              width='20'
              src='/img/github.svg'
              alt='github'
            />
            <a className='white' href='https://github.com/18F/crime-data-explorer'>GitHub</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
