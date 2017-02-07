import React from 'react'

import { content } from '../util/data'

const AboutTheData = ({ crime }) => {
  const { caveats, links } = content.crimes[crime]

  return (
    <div>
      <h3 className='mt0 mb4'>About the data</h3>
      <div className='lg-flex'>
        <div className='flex-auto mb1 black'>
          <p>
            The FBI collects crime data through the&nbsp;
            <a className='blue underline' href='https://ucr.fbi.gov/'>
              Uniform Crime Reporting (UCR) Program
            </a>.
          </p>
          {caveats.map((c, i) => (
            <div key={i}>
              <div className='bold'>{c.heading}</div>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
        <div
          className='flex-none ml3 xs-hide sm-hide md-hide'
          style={{ width: 300 }}
        >
          <div className='p2 sm-px4 sm-py3 bg-blue white'>
            <h4 className='mt0 mb1'>Further reading</h4>
            <ul className='m0 p0 left-bars'>
              {links.map((l, i) => (
                <li key={i} className='mb1'>
                  <a className='white' href={l.url}>{l.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutTheData
