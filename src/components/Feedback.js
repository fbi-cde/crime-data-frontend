import http from 'axios' // use axios to skip localStorage
import React from 'react'

import { hideFeedback } from '../actions/feedback'

const createIssueBody = ({ general, improve, next }) => (`
## What brought you to the site and how can we improve it?\n
${improve}\n\n

## General feedback about the site?\n
${general}\n\n

## How do you plan to use the information you found here?\n
${next}\n\n
`)

class Feedback extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: { general: '', improve: '', next: '' },
      result: {},
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { general, improve, next } = this.state.data
    const body = createIssueBody({ general, improve, next })
    const title = 'User feedback'
    http.post('/feedback', { body, title }).then(response => {
      const { html_url } = response.data
      this.setState({ result: { type: 'success', url: html_url } })
      setTimeout(() => {
        this.setState({ result: {}, data: {} })
        this.props.dispatch(hideFeedback())
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

    const { dispatch, isOpen } = this.props
    const { result } = this.state

    return (
      <div>
        <div className={`bg-blue feedback fixed p2 pb4 white z4 ${isOpen && 'show'}`}>
          <div>
            <button
              className='absolute btn cursor-pointer p1 right-0 top-0'
              onClick={() => dispatch(hideFeedback())}
              title='Close feedback'
            >
              &#10005;
            </button>
          </div>
          <form>
            <legend className='bold'>
              Help us improve the Crime Data Explorer
            </legend>
            <label className='block' htmlFor='improve'>
              What brought you to the site and how can we improve it?
            </label>
            <textarea
              className='col-12 no-resize'
              name='improve'
              onChange={handleChange}
              value={this.state.data.improve}
            />
            <label className='block' htmlFor='general'>
              General feedback about the site?
            </label>
            <textarea
              className='col-12 no-resize'
              name='general'
              onChange={handleChange}
              value={this.state.data.general}
            />
            <label className='block' htmlFor='next'>
              How do you plan to use the information you found here?
            </label>
            <textarea
              className='col-12 no-resize'
              name='next'
              onChange={handleChange}
              value={this.state.data.next}
            />
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
                  <span>
                    Thank you for your feedback. It was <a className='white underline' href={result.url}>logged here</a>.
                  </span>
                )}
                {result.type === 'error' && (
                  <span>There was an error: {result.msg}.</span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Feedback.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.boolean,
}

Feedback.defaultProps = {
  isOpen: false,
}

export default Feedback
