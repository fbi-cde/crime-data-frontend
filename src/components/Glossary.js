/* eslint-disable global-require */
import React from 'react'

import { hideGlossary, showGlossary } from '../actions/glossary'
import terms from '../../data/terms.json'


let GlossaryPanel
if (typeof window !== 'undefined') GlossaryPanel = require('glossary-panel')

class Glossary extends React.Component {
  constructor() {
    super()
    this.applyProps = ::this.applyProps
    this.showTerm = ::this.showTerm
    this.toggleGlossary = ::this.toggleGlossary
  }

  componentDidMount() {
    this.glossaryEl = new GlossaryPanel(terms) // eslint-disable-line no-new
    this.applyProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.applyProps(nextProps)
  }

  shouldComponentUpdate() { return false }

  setOpen(isOpen) {
    if (isOpen) this.glossaryEl.show()
    else this.glossaryEl.hide()
  }

  showTerm(term) {
    if (term) this.glossaryEl.findTerm(term)
  }

  applyProps(props) {
    const { isOpen, term } = props
    this.setOpen(isOpen)
    if (term) this.showTerm(term)
  }

  toggleGlossary() {
    const { dispatch, isOpen } = this.props
    if (isOpen) dispatch(hideGlossary())
    else dispatch(showGlossary())
  }

  render() {
    return (
      <div>
        <div
          className='p2 sm-p3 bg-black white glossary'
          id='glossary'
          aria-describedby='glossary-result'
          aria-hidden='true'
        >
          <button className='right btn p0' onClick={this.toggleGlossary}>
            <img src='/img/x.svg' alt='close' width='16' height='16' />
          </button>
          <h3 className='mt1 mb2 fs-26 white'>Glossary</h3>
          <label
            className='block mb-tiny fs-14 white italic'
            htmlFor='glossary-search'
          >
            Search glossary terms
          </label>
          <input
            className='field col-12 fs-14 js-glossary-search'
            id='glossary-search'
            type='search'
            placeholder='e.g. Committee'
          />
          <div className='glossary__content' id='glossary-result'>
            <ul className='js-glossary-list' />
          </div>
        </div>
        <div className='display-none'>
          <button className='js-glossary-toggle' title='Glossary toggle' />
          <button className='js-glossary-close btn btn-primary toggle'>
            <span className='u-visually-hidden'>Hide glossary</span>
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
  dispatch: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool,
}

export default Glossary
