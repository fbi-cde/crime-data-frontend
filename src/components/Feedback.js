import PropTypes from 'prop-types'
import React from 'react'

import OnEscape from './OnEscape'
import FocusTrap from './FocusTrap'

class Feedback extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.createInitialState()
  }

  componentDidMount() {
    this.handleFirstFocus()
  }

  componentDidUpdate(prevProps) {
    const wasOpen = prevProps.isOpen
    const { isOpen } = this.props
    if (isOpen && !wasOpen) {
      this.triggerElement = document.activeElement
      this.firstTextarea.focus()
    }
  }

  close = () => {
    const { isOpen, onClose } = this.props
    if (!isOpen) return
    this.triggerElement.focus()
    onClose()
  }

  createInitialState = () => ({
    data: Object.assign(...this.props.fields.map(f => ({ [f.id]: '' }))),
    result: {},
  })

  createIssueBody = () =>
    this.props.fields
      .map(f => ({
        id: f.id,
        label: f.label,
        data: this.state.data[f.id],
      }))
      .map(d => `## ${d.label}\n${d.data}\n\n`)
      .join('\n')

  validateSubmission = () => {
    const { fields } = this.props
    const { data } = this.state
    const areEmpty = Object.keys(data).filter(key => data[key] === '')
    if (areEmpty.length === fields.length) return false
    return true
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState(prevState => ({
      data: { ...prevState.data, [name]: value },
    }))
  }

  handleSubmit = e => {
    e.preventDefault()

    if (!this.validateSubmission()) {
      return this.handleValidationError()
    }
    return null
  }

  handleSubmitError = ({ response }) => {
    if (response && response.status === 404) {
      this.setState({
        result: {
          type: 'error',
          msg: "Please try again in a bit, we're having problems.",
        },
      })
      throw new Error(
        `Feedback component submission error: ${response.statusText}`,
      )
    }
  }

  handleSubmitSuccess = response => {
    const { html_url } = response.data
    this.setState({ result: { type: 'success', url: html_url } })
    setTimeout(() => {
      this.setState(this.createInitialState())
      this.close()
    }, 8000)
  }

  handleValidationError = () => {
    this.setState({
      result: {
        type: 'error',
        msg: 'Please provide feedback to at least one question above',
      },
    })
  }

  handleFirstFocus = () => {
    if (this.props.isOpen) this.firstTextarea.focus()
  }

  handleLastFocus = () => {
    if (this.props.isOpen) this.closeButton.focus()
  }

  render() {
    const { fields, isOpen } = this.props
    const { data, result } = this.state

    return (
      <OnEscape handler={this.close}>
        <FocusTrap
          setFirstFocus={this.handleFirstFocus}
          setLastFocus={this.handleLastFocus}
        >
          <div
            aria-label="Provide feedback to help us improve the Crime Data Explorer"
            role="dialog"
          >
            <div
              className={`fixed p3 bg-blue-dark white md-rounded-top mw30 z3 border-box feedback ${isOpen
                ? 'show'
                : ''}`}
            >
              <form>
                <legend className="mb2">
                  <h2 className="fs-16 md-fs-18 bold mt0 sans-serif">
                    Help us improve the Crime Data Explorer
                  </h2>
                  <p className="fs-14 sans-serif">
                    Please don’t include sensitive information like your name,
                    contact information or Social Security number.
                  </p>
                </legend>
                {fields.map((field, i) =>
                  <div key={i} className="mb-tiny">
                    <label
                      className="mb1 fs-14 md-fs-16 block bold line-height-3"
                      htmlFor={field.id}
                    >
                      {field.label}
                    </label>
                    <textarea
                      className="mb1 col-12 no-resize fs-14 field"
                      id={field.id}
                      name={field.id}
                      onChange={this.handleChange}
                      ref={el => {
                        if (i === 0) this.firstTextarea = el
                      }}
                      value={data[field.id]}
                    />
                  </div>,
                )}
                <p className="fs-14 sans-serif">
                  This information will be reported on Github, where it will be
                  publically visible. You can review all reported feedback on
                  our{' '}
                  <a
                    className="cursor-pointer underline white"
                    href="https://github.com/fbi-cde/crime-data-explorer/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aopen%20User%20feedback"
                  >
                    Github page
                  </a>
                  .
                </p>
                <div className="flex flex-row-reverse justify-between mt1">
                  <button
                    className="btn btn-primary bg-blue-lighter blue"
                    disabled={result.type === 'success'}
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                  <div className="fs-14 mw20">
                    {result.type === 'success' &&
                      <span role="alert">
                        Thank you for your feedback. It was{' '}
                        <a className="white underline" href={result.url}>
                          logged here
                        </a>.
                      </span>}
                    {result.type === 'error' &&
                      <span className="red-bright" role="alert">
                        Error: {result.msg}.
                      </span>}
                  </div>
                </div>
              </form>
              <button
                aria-label="Close feedback form"
                className="absolute fw-100 right-0 top-0 btn mr3 mt1 sm-mt2 px0 py-tiny"
                onClick={this.close}
                ref={el => {
                  this.closeButton = el
                }}
              >
                ✕
              </button>
            </div>
          </div>
        </FocusTrap>
      </OnEscape>
    )
  }
}

Feedback.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
}

Feedback.defaultProps = {
  fields: [
    {
      id: 'improve',
      label:
        'What brought you to the site and how can we improve your experience here?',
    },
    {
      id: 'general',
      label: 'General feedback about the site?',
    },
    {
      id: 'next',
      label: 'Using this data for something cool? Tell us about it!',
    },
  ],
  isOpen: false,
}

export default Feedback
