import React from 'react'

const Disclaimer = () => (
  <div className='clearfix fs-12 line-height-1 bg-white'>
    <div className='sm-col p1'>
      <img
        className='mr-tiny align-bottom'
        alt='US flag'
        width='18'
        height='12'
        src='img/usa-flag.png'
      />
      An official website of the United States government
    </div>
    <div className='sm-col-right xs-hide'>
      <span className='mr2 red bold'>This site is in beta.&nbsp;</span>
      <a
        className='px5 py1 inline-block bold caps white bg-red'
        href='https://github.com/18F/crime-data-explorer/issues'
      >
        Feedback
      </a>
    </div>

  </div>
)

export default Disclaimer
