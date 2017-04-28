import lowerCase from 'lodash.lowercase'
import md from 'markdown-it'
import PropTypes from 'prop-types'
import React from 'react'

import { showTerm } from '../actions/glossary'
import content from '../util/content'

const markdown = md()

class AboutTheData extends React.Component {
  componentDidMount() {
    document.addEventListener('click', this.triggerGlossaryTerm)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.triggerGlossaryTerm)
  }

  triggerGlossaryTerm = event => {
    const { dispatch } = this.props
    const { target } = event
    if (!target.closest('.about-the-data')) return
    if (!target.href || !target.href.match(/#glossary\?term=/)) return
    const term = lowerCase(target.href.split('term=')[1])

    event.preventDefault()
    dispatch(showTerm(term))
  }

  render() {
    const { crime } = this.props
    const { caveats, links } = content.crimes[crime]

    return (
      <div className='about-the-data'>
        <h3 className="mt0 mb4 fs-22 sm-fs-26">About the data</h3>
        <div className="lg-flex">
          <div className="flex-auto mb1 fs-14 sm-fs-16 black">
            <p>
              The FBI collects crime data through the&nbsp;
              <a className="blue underline" href="https://ucr.fbi.gov/">
                Uniform Crime Reporting (UCR) Program
              </a>.
            </p>
            <div className='caveats'>
              {caveats.map((c, i) => (
                <div key={i}>
                  <div className="bold">{c.heading}</div>
                  {/* eslint react/no-danger: 0 */}
                  <div
                    dangerouslySetInnerHTML={{ __html: markdown.render(c.text) }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className="flex-none ml3 xs-hide sm-hide md-hide"
            style={{ width: 300 }}
          >
            <div className="p2 sm-px4 sm-py3 bg-blue white">
              <h4 className="mt0 mb1 fs-18">Further reading</h4>
              <ul className="m0 p0 fs-14 sm-fs-16 left-bars">
                {links.map((l, i) => (
                  <li key={i} className="mb1">
                    <a className="white" href={l.url}>{l.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AboutTheData.propTypes = {
  crime: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
}

AboutTheData.defaultProps = {
  dispatch: () => {},
}

export default AboutTheData
