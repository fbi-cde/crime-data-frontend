import PropTypes from 'prop-types'
import React from 'react'

class BetaModal extends React.Component {
  componentDidMount() {
    this.triggerElement = document.activeElement || document.body
    document.addEventListener('keydown', this.closeOnEsc)
    this.setFocus()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeOnEsc)
  }

  setFocus = () => {
    this.closeBtn.focus()
  }

  restoreFocus = () => {
    this.triggerElement.focus()
  }

  close = () => {
    const { onClose } = this.props
    this.restoreFocus()
    onClose()
  }

  closeOnEsc = event => {
    if (event.keyCode === 27) { this.close() }
  }

  render() {
    const { onFeedbackClick } = this.props
    const fixed = 'fixed top-0 bottom-0 left-0 right-0'

    return (
      <div
        className={`${fixed} flex flex-column items-center justify-center z4`}
        aria-labelledby="beta-modal-title"
        aria-describedby="beta-modal-description"
        role="alertdialog"
      >
        <div className={`${fixed} bg-black-translucent`} />
        <div
          className="m2 p3 sm-px7 sm-py5 relative bg-red white border-box overflow-scroll rounded"
          style={{ maxWidth: 600 }}
        >
          <div className="center">
            <img
              className="align-middle"
              alt="info"
              src="/img/info-circle.svg"
              width="60"
              height="60"
            />
          </div>
          <h1 className="fs-24 sm-fs-32 my3 sm-mt5 sans-serif" id="beta-modal-title">
            The Crime Data Explorer site is in beta.
          </h1>
          <p className="m0 fs-16 sm-fs-20" id="beta-modal-description">
            This site is a work in progress. Crime data visualizations and data
            downloads are not meant for statisical purposes or analysis at this
            time.
          </p>
          <button
            className="btn btn-primary my4 sm-my6 mx-auto block bg-white blue btn col-10 sm-col-7"
            onClick={() => { this.close() }}
            ref={el => { this.closeBtn = el }}
          >
            Take me to the beta site
          </button>
          <div className="fs-16 sm-fs-18 center">
            Help us make it better:{' '}
            <br className="sm-hide md-hide lg-hide" />
            <button
              className="bg-transparent bold border-none border-bottom cursor-pointer white"
              onClick={() => { this.close(); onFeedbackClick() }}
            >
              Submit feedback
            </button>
            <button
              className='bg-transparent border-none inline right'
              id='beta-modal-trap-focus'
            />
          </div>
        </div>
      </div>
    )
  }
}

BetaModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onFeedbackClick: PropTypes.func.isRequired,
}

export default BetaModal
