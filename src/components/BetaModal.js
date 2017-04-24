import PropTypes from 'prop-types'
import React from 'react'


const BetaModal = ({ onConfirm }) => {
  const fixed = 'fixed top-0 bottom-0 left-0 right-0'

  return (
    <div className={`${fixed} flex flex-column items-center justify-center z2`}>
      <div className={`${fixed} bg-black-translucent`} />
      <div
        className='m2 p3 sm-px7 sm-py5 relative bg-red white border-box overflow-scroll rounded'
        style={{ maxWidth: 600 }}
      >
        <div className='center'>
          <img
            className='align-middle'
            alt='info'
            src='/img/info-circle.svg'
            width='60'
            height='60'
          />
        </div>
        <h1 className='fs-24 sm-fs-32 my3 sm-mt5 sans-serif'>
          The Crime Data Explorer site is in beta.
        </h1>
        <p className='m0 fs-16 sm-fs-20'>
          This site is a work in progress. Crime data visualizations and data
          downloads are not meant for statisical purposes or analysis at this
          time.
        </p>
        <button
          className='btn btn-primary my4 sm-my6 mx-auto block bg-white blue btn col-10 sm-col-7'
          onClick={onConfirm}
        >
          Take me to the beta site
        </button>
        <div className='fs-16 sm-fs-18 center'>
          Help us make it better:{' '}
          <br className='sm-hide md-hide lg-hide' />
          <a
            className='white bold border-bottom'
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
  onConfirm: PropTypes.func
}

export default BetaModal
