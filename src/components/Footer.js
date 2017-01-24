import React from 'react'
import { Link } from 'react-router'

const Footer = () => (
  <footer className='clearfix py3 bg-blue white'>
    <div className='container px2'>
      <div className='sm-col'>
        <h3 className='mt0'>Crime Data Explorer</h3>
        <div className='mb2'>
          {['FBI', 'CJIS'].map((l, i) => (
            <div key={i} className='p2 mr1 inline-block border border-white'>{l}</div>
          ))}
        </div>
      </div>
      <div className='sm-col-right h6'>
        <div className='mxn1 pt1 pb3 bold caps'>
          <Link to='/'className='px1 white'>Explorer</Link>
          <Link to='/downloads-and-documentation' className='px1 white'>Downloads</Link>
          <Link to='/about' className='px1 white'>About</Link>
        </div>
        <div>
          <div className='bold'>Contact us</div>
          <div>Criminal Justice Information Services (CJIS) Division</div>
          <a className='white mr1' href='mailto:cjis_comm@leo.gov'>cjis_comm@leo.gov</a>
          <a className='white' href='tel:3046254995'>(304) 625-4995</a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
