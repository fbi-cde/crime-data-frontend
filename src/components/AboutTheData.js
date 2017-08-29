import lowerCase from 'lodash.lowercase'
import PropTypes from 'prop-types'
import React from 'react'

import content from '../util/content'
import markdown from '../util/md'

class AboutTheData extends React.Component {
  componentDidMount() {
    document.addEventListener('click', this.triggerGlossaryTerm)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.triggerGlossaryTerm)
  }

  triggerGlossaryTerm = e => {
    const { target } = e

    if (!target.closest('#about-the-data .caveats')) return
    if (!target.href || !target.href.match(/#glossary\?term=/)) return

    // only prevent default if the click event is a glossary term link
    e.preventDefault()

    const term = lowerCase(target.href.split('term=')[1])
    this.props.onTermClick(term)
  }

  render() {
    const { crime } = this.props
    const { caveats, links } = content.crimes[crime]

    return (
      <div
        className="mb4 pt5 border-top border-blue-lighter"
        id="about-the-data"
      >
        <h3 className="mt0 mb3 fs-22 sm-fs-26">
          About {lowerCase(crime)} data
        </h3>
        <div className="lg-flex">
          <div className="flex-auto mb1 lg-pr5 fs-14 sm-fs-16 black">
            <p className="mb3">
              The FBI collects crime data through the&nbsp;
              <a className="black underline" href="https://ucr.fbi.gov/">
                Uniform Crime Reporting (UCR) Program
              </a>.
            </p>
            <div className="caveats">
              {caveats.map((c, i) =>
                <div key={i}>
                  <div className="mb-tiny bold caps">
                    {c.heading}
                  </div>
                  {/* eslint react/no-danger: 0 */}
                  <div
                    className="mb3"
                    dangerouslySetInnerHTML={{
                      __html: markdown.render(c.text),
                    }}
                  />
                </div>,
              )}
            </div>
          </div>
          <div className="flex-none mb2 col-12 lg-block lg-col-4 lg-ml3 lg-mb0">
            <div className="p2 sm-px4 sm-py3 bg-blue white">
              <h4 className="mt0 mb1 fs-18 sm-fs-22">Further reading</h4>
              <ul className="m0 p0 fs-14 left-bars">
                {links.map((l, i) =>
                  <li key={i} className="mb1">
                    <a className="white" href={l.url}>
                      {l.text}
                    </a>
                  </li>,
                )}
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
  onTermClick: PropTypes.func.isRequired,
}

export default AboutTheData
