import http from 'axios' // use axios to skip localStorage
import React from 'react'

import { hideFeedback } from '../actions/feedback'

const createIssueBody = data => (
  data.map(d => (
    `## ${d.label}\n${d.data}\n\n`
  )).join('\n')
)

class Feedback extends React.Component {
  constructor(props) {
    super(props)

    const data = props.fields.map(f => f.id).reduce((a, n) => {
      const d = { ...a }
      d[n] = ''
      return d
    }, {})

    this.state = {
      data,
      result: {},
    }
  }

  componentDidMount() {
    const { isOpen } = this.props
    document.addEventListener('focus', this.trapFocus, true)
    document.addEventListener('keydown', this.closeOnEsc)
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
    document.removeEventListener('focus', this.trapFocus)
    document.removeEventListener('keydown', this.closeOnEsc)
  }

  setFocus = () => {
    this.firstTextarea.focus()
  }

  close = () => {
    const { dispatch } = this.props
    dispatch(hideFeedback())
    this.triggerElement.focus()
  }

  closeOnEsc = event => {
    const { isOpen } = this.props
    if (isOpen && event.keyCode === 27) { this.close() }
  }

  trapFocus = event => {
    const { isOpen } = this.props
    if (!isOpen) return
    if (event.target.closest('#feedback-trap-focus')) {
      event.preventDefault();
      this.setFocus()
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    const data = this.props.fields.map(f => ({
      id: f.id,
      label: f.label,
      data: this.state.data[f.id]
    }))
    const body = createIssueBody(data)
    const title = 'User feedback'
    http.post('/feedback', { body, title }).then(response => {
      const { html_url } = response.data
      this.setState({ result: { type: 'success', url: html_url } })
      setTimeout(() => {
        this.setState({ result: {}, data: {} })
        this.close()
      }, 8000)
    }).catch(httpErr => {
      if (status === 404) {
        this.setState({ result: {
          type: 'error',
          msg: httpErr.response.statusText
        } })
      }
    })
  }

  render() {
    const handleChange = e => (
      this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    )

    const { dispatch, fields, isOpen } = this.props
    const { result } = this.state

    return (
      <div aria-label='Provide feedback to help us improve the Crime Data Explorer' role='dialog'>
        <div className={`bg-blue feedback fixed p2 pb4 white z4 ${isOpen && 'show'}`}>
          <form>
            <legend className='bold'>
              Help us improve the Crime Data Explorer
            </legend>
            {fields.map((field, i) => (
              <div key={i}>
                <label className='block' htmlFor={field.id}>
                  {field.label}
                </label>
                <textarea
                  className='col-12 no-resize'
                  name={field.id}
                  onChange={handleChange}
                  ref={el => { if (i === 0) this.firstTextarea = el }}
                  value={this.state.data[field.id]}
                />
              </div>
            ))}
            <div className='flex mt1'>
              <button
                className='btn btn-primary bg-blue-lighter black maxh5'
                disabled={this.state.result.type === 'success'}
                onClick={this.handleSubmit}
              >
                Submit
              </button>
              <div className='mw8 ml1'>
                {result.type === 'success' && (
                  <span role='alert'>
                    Thank you for your feedback. It was <a className='white underline' href={result.url}>logged here</a>.
                  </span>
                )}
                {result.type === 'error' && (
                  <span role='alert'>There was an error: {result.msg}.</span>
                )}
              </div>
            </div>
          </form>
          <button
            aria-label='Close feedback form'
            className='absolute btn cursor-pointer p1 right-0 top-0'
            onClick={() => dispatch(hideFeedback())}
          >
            &#10005;
          </button>
          <button
            className='bg-transparent border-none inline right'
            id='feedback-trap-focus'
          />
        </div>
      </div>
    )
  }
}

Feedback.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  fields: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    label: React.PropTypes.string,
  })),
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
