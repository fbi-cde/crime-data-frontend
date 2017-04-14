import React from 'react'


const mockBody = {
  classList: {
    add: () => {},
    remove: () => {},
  },
}

class BetaModal extends React.Component {
  constructor(props) {
    super(props)

    this.$body = (typeof window !== 'undefined') ? document.body : mockBody
  }

  componentWillMount() {
    this.$body.classList.add('overflow-hidden')
  }

  componentWillUnmount() {
    this.$body.classList.remove('overflow-hidden')
  }

  render() {
    const { onConfirm } = this.props

    return (
      <div
        className='fixed bg-black-translucent full-height full-width'
        style={{
          bottom: '0',
          top: '0',
        }}
      >
        <div
          className='fixed bg-red border-box flex flex-column flex-justify-center mx-auto px8 py3 white'
          style={{
            bottom: '15%',
            left: '25%',
            right: '25%',
            top: '15%',
          }}
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
          <h1 className='fs-28 mb2 mt3 sans-serif'>
            The Crime Data Explorer site is in beta.
          </h1>
          <p className='fs-18'>
            This site is a work in progress. Crime data visualizations and data
            downloads are not meant for statisical purposes or analysis at this
            time.
          </p>
          <button
            className='bg-white black block btn col-6 mt2 mx-auto'
            onClick={onConfirm}
          >
            Take me to the beta site!
          </button>
          <div className='flex flex-justify-center flex-row mt4'>
            <p className='fs-16 white mr2'>Help us make it better:</p>
            <a
              className='bold fs-16 ml2 underline white'
              href='https://github.com/18F/crime-data-explorer/issues'
            >
              Submit feedback
            </a>
          </div>
        </div>
      </div>
    )
  }
}

BetaModal.propTypes = {
  onConfirm: React.PropTypes.func
}

export default BetaModal
