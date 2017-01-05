import React from 'react'

const Disclaimer = () => (
  <div className='clearfix p1 h6 bg-white line-height-1'>
    <div className='right xs-hide'>
      This site is currently in beta.&nbsp;
      <a href='https://18f.gsa.gov/dashboard/stages/#beta'>Learn more.</a>
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
