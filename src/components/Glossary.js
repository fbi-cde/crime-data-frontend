import GlossaryPanel from 'glossary-panel'
import React from 'react'

import { hide, show } from '../actions/glossaryActions'
import terms from '../../data/terms.json'

class Glossary extends React.Component {
  constructor() {
    super()
    this.toggleGlossary = this.toggleGlossary.bind(this)
  }

  componentDidMount() {
    this.glossaryEl = new GlossaryPanel(terms) // eslint-disable-line no-new
    if (this.props.isVisible) this.glossaryEl.show()
  }

  componentWillReceiveProps(nextProps) {
    this.setVisibility(nextProps.isVisible)
  }

  shouldComponentUpdate() { return false }

  setVisibility(isVisible) {
    if (isVisible) this.glossaryEl.show()
    else this.glossaryEl.hide()
  }

  toggleGlossary() {
    const { dispatch, isVisible } = this.props
    if (isVisible) dispatch(hide())
    else dispatch(show())
  }

  render() {
    return (
      <div>
        <div className='fixed left-0 bottom-0 p1'>
          <button
            className='btn btn-outline'
            onClick={this.toggleGlossary}
          >
            Glossary
          </button>
        </div>
        <div
          className='p2 glossary'
          id='glossary'
          aria-describedby='glossary-result'
          aria-hidden='true'
        >
          <button className='js-glossary-close btn btn-primary toggle' title='Close glossary'>
            <span className='u-visually-hidden'>Hide glossary</span>
          </button>
          <h2>Glossary</h2>
          <label className='label' htmlFor='glossary-search'>Filter glossary terms</label>
          <input
            className='field js-glossary-search'
            id='glossary-search'
            type='search'
            placeholder='e.g. Committee'
          />
          <div className='glossary__content' id='glossary-result'>
            <ul className='js-glossary-list' />
          </div>
        </div>
      </div>
    )
  }
}

Glossary.defaultProps = {
  dispatch: () => {},
  isVisible: false,
}

Glossary.propTypes = {
  dispatch: React.PropTypes.func,
  isVisible: React.PropTypes.bool,
}

export default Glossary
