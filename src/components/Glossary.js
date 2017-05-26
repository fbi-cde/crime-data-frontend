import PropTypes from 'prop-types'
import React from 'react'

import terms from '../../content/terms.json'

let GlossaryPanel
if (typeof window !== 'undefined') {
  GlossaryPanel = require('glossary-panel') // eslint-disable-line global-require
}

class Glossary extends React.Component {
  state = { error: null }

  componentDidMount() {
    this.glossaryEl = new GlossaryPanel(terms) // eslint-disable-line no-new
    this.applyProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.applyProps(nextProps)
  }

  setOpen = isOpen => {
    if (isOpen) this.glossaryEl.show()
    else this.glossaryEl.hide()
  }

  showTerm = term => {
    if (!term) return
    this.setState({ error: null })

    try {
      this.glossaryEl.findTerm(term.toLowerCase())
    } catch (e) {
      if (e.message === "Cannot read property 'elm' of undefined") {
        this.setState({ error: `Cannot find "${term}".` })
      }
    }
  }

  applyProps = props => {
    const { isOpen, term } = props
    this.setOpen(isOpen)
    if (term) this.showTerm(term)
  }

  toggleGlossary = () => {
    const { actions, isOpen } = this.props
    if (isOpen) actions.hideGlossary()
    else actions.showGlossary()
  }

  render() {
    const { error } = this.state

    return (
      <div>
        <div
          className="p2 sm-p3 bg-black white z1 glossary"
          id="glossary"
          aria-describedby="glossary-result"
          aria-hidden="true"
        >
          <button className="right btn p0" onClick={this.toggleGlossary}>
            <img src="/img/x.svg" alt="close" width="16" height="16" />
          </button>
          <h3 className="mt1 mb2 fs-26 white">Glossary</h3>
          <label
            className="block mb-tiny fs-14 white italic"
            htmlFor="glossary-search"
          >
            Search glossary terms
          </label>
          <input
            className="field col-12 fs-14 js-glossary-search"
            id="glossary-search"
            type="search"
            placeholder="e.g. Committee"
          />
          {error &&
            <p className="my1 p1 fs-14 bold bg-red-bright white">{error}</p>}
          <div className="glossary__content" id="glossary-result">
            <ul className="js-glossary-list" />
          </div>
        </div>
        <div className="display-none">
          <button className="js-glossary-toggle" title="Glossary toggle" />
          <button className="js-glossary-close btn btn-primary toggle">
            <span className="u-visually-hidden">Hide glossary</span>
          </button>
        </div>
      </div>
    )
  }
}

Glossary.defaultProps = {
  isOpen: false,
}

Glossary.propTypes = {
  actions: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
}

export default Glossary
