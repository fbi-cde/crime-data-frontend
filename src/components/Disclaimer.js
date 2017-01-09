import React from 'react'

const Disclaimer = () => (
  <div className='clearfix p1 h6 bg-white line-height-1'>
    <div className='right xs-hide'>
      This site is in beta.&nbsp;
      <a href='https://github.com/18F/crime-data-explorer/issues'>Share your feedback.</a>
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
