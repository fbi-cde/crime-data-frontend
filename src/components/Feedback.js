import http from 'axios' // use axios to skip localStorage
import React from 'react'


class Feedback extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      data: { improve: '', general: '', next: '' },
    }
  }

  createIssueBody = () => {
    return `
## What brought you to the site and how can we improve it?\n
${this.state.data.improve}\n\n

## General feedback about the site?\n
${this.state.data.general}\n\n

## How do you plan to use the information you found here?\n
${this.state.data.next}\n\n
    `
  }

  handleSubmit = e => {
    e.preventDefault()
    const body = this.createIssueBody()
    const title = 'User feedback'
    http.post('/feedback', { body, title }).then(response => {
      const { html_url } = response.data
      const msg = `thanks for your feedback! it was logged here: ${html_url}`
      this.setState({ msg })
      setTimeout(() => this.setState({ show: false, msg: null }), 4000)
    }).catch(httpErr => {
      if (status === 404) this.setState({ msg: httpErr.response.statusText })
    })
  }

  render() {
    const handleChange = e => (
      this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    )

    return (
      <div>
        <div className={`fixed bg-black feedback p2 pb4 white z4 ${this.state.show && 'show'}`}>
          <button
            className='absolute right-5'
            onClick={() => this.setState({ show: false })}
          >
            Close
          </button>
          <form>
            <legend className='bold'>
              Help us improve the Crime Data Explorer
            </legend>
            <label className='block' htmlFor='improve'>
              What brought you to the site and how can we improve it?
            </label>
            <textarea
              className='col-12'
              name='improve'
              onChange={handleChange}
              value={this.state.data.improve}
            />
            <label className='block' htmlFor='general'>
              General feedback about the site?
            </label>
            <textarea
              className='col-12'
              name='general'
              onChange={handleChange}
              value={this.state.data.general}
            />
            <label className='block' htmlFor='next'>
              How do you plan to use the information you found here?
            </label>
            <textarea
              className='col-12'
              name='next'
              onChange={handleChange}
              value={this.state.data.next}
            />
            <button
              className='block btn btn-primary bg-blue-lighter black mt1'
              onClick={this.handleSubmit}
            >
              Submit
            </button>
            <div className='red'>{ this.state.msg }</div>
          </form>
        </div>
        <button
          className='bg-blue-lighter black btn md-rounded-top fixed bottom-0 right-5'
          onClick={() => this.setState({ show: true })}
        >
          Give feedback
        </button>
      </div>
    )
  }
}

Feedback.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
}

export default Feedback
