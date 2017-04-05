import React from 'react'

import Link from './Link'
import packageJson from '../../package.json'

const links = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Explorer',
    href: '/explorer/united-states/violent-crime',
  },
  {
    text: 'About',
    href: '/about',
  },
  {
    text: 'Downloads & Documentation',
    href: '/downloads-and-docs',
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
        <span className='mb1 fs-10 md-fs-12 caps bold line-height-1 blue-light-508 block'>
          Federal Bureau of Investigation
        </span>
        <Link to='/' className='fs-24 md-fs-32 serif line-height-1 white'>
          Crime Data Explorer
        </Link>
        <span className='block fs-10'>
          v{packageJson.version} -{' '}
          <a
            className='white'
            href='https://github.com/18F/crime-data-explorer/blob/master/CHANGELOG.md'
          >
            Changelog
          </a>
        </span>
      </div>
      <div className='clearfix mxn2'>
        <div className='md-col md-col-5 px2 mb3 md-m0'>
          <ul className='m0 p0 fs-14 list-style-none left-bars'>
            {links.map((l, i) => (
              <li key={i}>
                <Link
                  className='white caps'
                  to={l.href}
                >
                  {l.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='md-col md-col-5 px2 mb3 md-m0 fs-14 white'>
          <div className='mb1 bold fs-18 serif blue-light-508'>Contact us</div>
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
          <div className='mb1 bold fs-18 serif blue-light-508'>Follow us</div>
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
