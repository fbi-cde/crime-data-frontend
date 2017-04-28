import http from 'axios' // use axios to skip localStorage
import React from 'react'

class Feedback extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: Object.assign(...props.fields.map(f => ({ [f.id]: '' }))),
      result: {},
    }
  }

  componentDidMount() {
    const { isOpen } = this.props
    document.addEventListener('focus', this.handleFocus, true)
    document.addEventListener('keydown', this.handleKeydown)
    if (isOpen) this.setFocus()
  }

  componentDidUpdate(prevProps) {
    const wasOpen = prevProps.isOpen
    const { isOpen } = this.props
    if (isOpen && !wasOpen) {
      this.triggerElement = document.activeElement
      this.setFocus()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('focus', this.handleFocus)
    document.removeEventListener('keydown', this.handleKeydown)
  }

  setFocus = () => {
    this.firstTextarea.focus()
  }

  close = () => {
    this.triggerElement.focus()
    this.props.onClose()
  }

  createIssueBody = () =>
    this.props.fields
      .map(f => ({
        id: f.id,
        label: f.label,
        data: this.state.data[f.id],
      }))
      .map(d => `## ${d.label}\n${d.data}\n\n`)
      .join('\n')

  handleChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })

  handleFocus = e => {
    const { isOpen } = this.props
    if (!isOpen) return
    if (e.target.closest('#feedback-trap-focus')) {
      e.preventDefault()
      this.setFocus()
    }
  }

  handleKeydown = e => {
    const { isOpen } = this.props
    const escKey = e.keyCode === 27
    const tabKey = event.keyCode === 9
    if (isOpen && escKey) {
      this.close()
    } else if (event.shiftKey && tabKey && e.target === this.firstTextarea) {
      e.preventDefault()
      this.closeButton.focus()
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    http
      .post('/feedback', {
        body: this.createIssueBody(),
        title: 'User feedback',
      })
      .then(this.handleSubmitSuccess)
      .catch(this.handleSubmitError)
  }

  handleSubmitError = err => {
    if (err.status === 404) {
      this.setState({
        result: {
          type: 'error',
          msg: err.response.statusText,
        },
      })
    }
  }

  handleSubmitSuccess = response => {
    const { html_url } = response.data
    this.setState({ result: { type: 'success', url: html_url } })
    setTimeout(() => {
      this.setState({ result: {}, data: {} })
      this.close()
    }, 8000)
  }

  render() {
    const { fields, isOpen } = this.props
    const { data, result } = this.state

    return (
      <div
        aria-label="Provide feedback to help us improve the Crime Data Explorer"
        role="dialog"
      >
        <div
          className={`fixed p2 bg-blue white md-rounded-top z3 feedback ${isOpen ? 'show' : ''}`}
        >
          <form>
            <legend className="mb2 fs-18 bold">
              Help us improve the Crime Data Explorer
            </legend>
            {fields.map((field, i) => (
              <div key={i}>
                <label className="mb-tiny block" htmlFor={field.id}>
                  {field.label}
                </label>
                <textarea
                  className="mb1 col-12 no-resize fs-14 field"
                  name={field.id}
                  onChange={this.handleChange}
                  ref={el => {
                    if (i === 0) this.firstTextarea = el
                  }}
                  value={data[field.id]}
                />
              </div>
            ))}
            <div className="flex mt1">
              <button
                className="btn btn-primary bg-blue-lighter blue"
                disabled={result.type === 'success'}
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <div className="mw20 ml1">
                {result.type === 'success' &&
                  <span role="alert">
                    Thank you for your feedback. It was{' '}
                    <a className="white underline" href={result.url}>
                      logged here
                    </a>.
                  </span>}
                {result.type === 'error' &&
                  <span role="alert">There was an error: {result.msg}.</span>}
              </div>
            </div>
          </form>
          <button
            aria-label="Close feedback form"
            className="absolute right-0 top-0 btn m1 p0"
            onClick={this.close}
            ref={el => {
              this.closeButton = el
            }}
          >
            ✕
          </button>
          <button className="btn p0 inline right" id="feedback-trap-focus" />
        </div>
      </div>
    )
  }
}

Feedback.propTypes = {
  fields: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string,
      label: React.PropTypes.string,
    }),
  ),
  onClose: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool,
}

Feedback.defaultProps = {
  fields: [
    {
      id: 'improve',
      label: 'What brought you to the site and how can we improve it?',
    },
    {
      id: 'general',
      label: 'General feedback about the site?',
    },
    {
      id: 'next',
      label: 'How do you plan to use the information you found here?',
    },
  ],
  isOpen: false,
}

export default Feedback
