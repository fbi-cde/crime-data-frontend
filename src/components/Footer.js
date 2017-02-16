import React from 'react'
import { Link } from 'react-router'

const firstRow = [
  {
    text: 'Home',
    href: '/',
  },
  {
    text: 'Explorer',
    href: '/explorer',
  },
  {
    text: 'Downloads and Documentation',
    href: '/downloads-and-docs',
  },
  {
    text: 'About',
    href: '/about',
  },
]
const secondRow = [
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
const liCls = 'mb1 ml1 fs-10 md-fs-12 sm-block md-inline-block'
const linkCls = 'border-left border-white white pl1'
const scrollToTop = () => window.scrollTo(0, 0)

const Footer = () => (
  <footer className='py7 bg-blue white'>
    <div className='items-center container-big mx-auto mt1 px2'>
      <div className='clearfix'>
        <div className='sm-col sm-col-6'>
          <div className='mb1 fs-12 line-height-1 caps bold blue-gray'>
            Federal Bureau of Investigation
          </div>
          <div className='fs-32 line-height-1 serif'>Crime Data Explorer</div>
          <div className='my4'>
            {['FBI', 'CJIS'].map((l, i) => (
              <div
                className='p2 mr3 inline-block border border-white'
                key={i}
              >
                {l}
              </div>
            ))}
          </div>
        </div>
        <div className='sm-col sm-col-6 sm-col-right fs-14'>
          <div className='pb3 caps clearfix'>
            <ul className='list-style-none px0 m0 mb1 col col-6 md-col-12'>
              {firstRow.map((l, i) => {
                const isFirst = i === 0
                return (
                  <li
                    key={i}
                    className={`${liCls} ${isFirst && 'md-ml0'}`}
                  >
                    <Link
                      className={`${linkCls} ${isFirst && 'md-pl0 md-border-none'}`}
                      onClick={scrollToTop}
                      to={l.href}
                    >
                      {l.text}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <ul className='list-style-none px0 my0 col col-6 md-col-12'>
              {secondRow.map((l, i) => {
                const isFirst = i === 0
                return (
                  <li
                    key={i}
                    className={`${liCls} ${isFirst && 'md-ml0'}`}
                  >
                    <Link
                      className={`${linkCls} ${isFirst && 'md-pl0 md-border-none'}`}
                      to={l.href}
                    >
                      {l.text}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <div className='mb1 bold fs-18 serif red-bright'>Contact us</div>
            <div className='bold'>Criminal Justice Information Services (CJIS) Division</div>
            <a
              className='mr1 pr1 white border-white border-right'
              href='mailto:cjis_comm@leo.gov'
            >
              cjis_comm@leo.gov
            </a>
            <a className='white' href='tel:3046254995'>(304) 625-4995</a>
          </div>
          <div className='mt3'>
            <div className='bold'>FBI Uniform Crime Reporting Program</div>
            <p className='m0 white'>
              <span className='mr1 pr1 border-right border-white'>
                1000 Custer Hollow Road
              </span>
              <span>Clarksburg, WV 26306</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
