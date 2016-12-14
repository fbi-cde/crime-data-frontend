import React from 'react'
import { Link } from 'react-router'

const Footer = () => (
  <footer className='clearfix py2 bg-blue white'>
    <div className='container'>
      <div className='sm-col'>
        <h2 className='h5'>Crime Data Explorer</h2>
        <img alt='FBI Logo' />
        <img alt='CJIS logo' />
      </div>
      <div className='sm-col-right'>
        <div>
          <Link to='/'className='btn py2'>Explorer</Link>
          <Link to='/downloads-and-documentation' className='btn py2'>
            Downloads & Documentation
          </Link>
          <Link to='/about' className='btn py2'>About</Link>
        </div>
        <div>
          <p className='strong'>Contact us</p>
          <p>Criminal Justice Information Services (CJIS) Division</p>
          <a className='btn' href='mailto:cjis_comm@leo.gov'>
            cjis_comm@leo.gov
          </a>
          <a className='btn' href='tel:3046254995'>(304) 625-4995</a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
