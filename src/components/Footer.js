import React from 'react'
import { Link } from 'react-router'

const linkClass = 'mr1 pr1 white border-right border-white'
const linkClassLast = 'white'

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
          <div className='pb3 caps'>
            <ul className='list-style-none px0 m0 mb1'>
              <li className='inline-block'>
                <Link
                  className={linkClass}
                  onClick={scrollToTop}
                  to='/'
                >
                  Explorer
                </Link>
              </li>
              <li className='inline-block'>
                <Link
                  className={linkClass}
                  onClick={scrollToTop}
                  to='/downloads-and-docs'
                >
                  Downloads & Documentation
                </Link>
              </li>
              <li className='inline-block'>
                <Link
                  className={linkClass}
                  onClick={scrollToTop}
                  to='/about'
                >
                  About
                </Link>
              </li>
              <li className='inline-block'>
                <Link className={linkClassLast} to='/'>Glossary</Link>
              </li>
            </ul>
            <ul className='list-style-none px0 my0'>
              <li className='inline-block'>
                <Link className={linkClass} to='/'>Accessibility</Link>
              </li>
              <li className='inline-block'>
                <Link className={linkClass} to='/'>Privacy Policy</Link>
              </li>
              <li className='inline-block'>
                <Link className={linkClass} to='/'>License</Link>
              </li>
              <li className='inline-block'>
                <Link className={linkClassLast} to='/'>Feedback</Link>
              </li>
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
