import React from 'react'

import GlossaryPanel from 'glossary-panel'
import terms from '../../data/terms.json'

class Glossary extends React.Component {
  componentDidMount() {
    window.Glossary = new GlossaryPanel(terms) // eslint-disable-line no-new
  }

  shouldComponentUpdate() { return false }

  render() {
    return (
      <div>
        <div className='fixed left-0 bottom-0 p1'>
          <button className='btn btn-outline js-glossary-toggle'>Glossary</button>
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

export default Glossary
