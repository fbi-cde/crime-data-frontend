import React from 'react'


const BetaModal = ({ onConfirm }) => {
  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 flex flex-column flex-justify-center z2'
    >
      <div className='bg-black-translucent fixed top-0 bottom-0 left-0 right-0' />
      <div
        className='bg-red border-box p3 sm-px8 py3 m2 sm-mt7 sm-mx-auto white overflow-scroll relative'
        style={{ maxWidth: 700 }}
      >
        <div
          className='border border-box border-white center circle fs-28 mx-auto'
          style={{
            height: '40px',
            width: '40px',
          }}
        >
          i
        </div>
        <h1 className='fs-22 sm-fs-28 mb2 mt3 sans-serif'>
          The Crime Data Explorer site is in beta.
        </h1>
        <p className='fs-14 sm-fs-18'>
          This site is a work in progress. Crime data visualizations and data
          downloads are not meant for statisical purposes or analysis at this
          time.
        </p>
        <button
          className='bg-white black block btn col-10 sm-col-6 mt2 mx-auto'
          onClick={onConfirm}
        >
          Take me to the beta site!
        </button>
        <div className='sm-flex flex-justify-center flex-row mt4'>
          <p className='fs-16 white mr2 mb0'>Help us make it better:</p>
          <a
            className='bold fs-16 underline white'
            href='https://github.com/18F/crime-data-explorer/issues'
          >
            Submit feedback
          </a>
        </div>
      </div>
    </div>
  )
}

BetaModal.propTypes = {
  onConfirm: React.PropTypes.func
}

export default BetaModal
