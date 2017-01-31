import React from 'react'
import { Link } from 'react-router'

const linkClass = 'mr1 pr1 white border-right border-white'
const linkClassLast = 'white'

const Footer = () => (
  <footer className='py7 bg-blue white'>
    <div className='items-center container-big mx-auto mt1 px2'>
      <div className='clearfix'>
        <div className='sm-col sm-col-6'>
          <div className='mb1 h6 caps bold line-height-1 blue-gray'>
            Federal Bureau of Investigation
          </div>
          <div className='h2 serif line-height-1'>Crime Data Explorer</div>
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
        <div className='sm-col sm-col-6 sm-col-right h6'>
          <div className='pb3 caps'>
            <ul className='list-style-none px0 m0 mb1'>
              <li className='inline-block'>
                <Link className={linkClass} to='/'>Explorer</Link>
              </li>
              <li className='inline-block'>
                <Link className={linkClass} to='/downloads-and-docs'>
                  Downloads & Documentation
                </Link>
              </li>
              <li className='inline-block'>
                <Link className={linkClass} to='/about'>About</Link>
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
          <div className='fs3'>
            <div className='bold fs2 serif red-bright'>Contact us</div>
            <div className='bold mt1'>Criminal Justice Information Services (CJIS) Division</div>
            <a
              className='border-white border-right pr1 white'
              href='mailto:cjis_comm@leo.gov'
            >
              cjis_comm@leo.gov
            </a>
            <a className='pl1 white' href='tel:3046254995'>(304) 625-4995</a>
          </div>
          <div className='fs3 mt3'>
            <div className='bold'>FBI Uniform Crime Reporting Program</div>
            <p className='white m0'>
              <span className='border-white border-right pr1'>
                1000 Custer Hollow Road
              </span>
              <span className='pl1'>Clarksburg, WV 26306</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
