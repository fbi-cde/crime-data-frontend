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

    const modal = {
      bottom: '25%',
      left: '25%',
      right: '25%',
      top: '25%',
    }

    const overlay = {
      bottom: '0',
      top: '0',
    }

    return (
      <div
        className='fixed bg-black-translucent full-height full-width'
        style={overlay}
      >
        <div
          className='fixed bg-red border-box flex flex-column flex-space-around mx-auto px4 py2 white'
          style={modal}
        >
          <h1 className='h3 mt0 sans-serif'>
            The Crime Data Explorer site is in beta.
          </h1>
          <p>
            This site is a work in progress. Crime data visualizations and data
            downloads are not meant for statisical purposes or analysis at this
            time.
          </p>
          <button
            className='bg-white black block btn col-6 mx-auto'
            onClick={onConfirm}
          >
            Take me to the beta site!
          </button>
        </div>
      </div>
    )
  }
}

BetaModal.propTypes = {
  onConfirm: React.PropTypes.func
}

export default BetaModal
