import React from 'react'

const Disclaimer = () => (
  <div className='clearfix px2 sm-px6 py1 h6 bg-white line-height-1'>
    <div className='right xs-hide red'>
      This site is in beta.&nbsp;
      <a
        className='red bold'
        href='https://github.com/18F/crime-data-explorer/issues'
      >
        Share your feedback.
      </a>
    </div>
    <img
      className='mr-tiny align-bottom'
      alt='US flag'
      width='18'
      height='12'
      src='/img/usa-flag.png'
    />
    An official website of the United States government
  </div>
)

export default Disclaimer
