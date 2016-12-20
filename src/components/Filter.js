import React from 'react'

import { slugify } from '../util/text'

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: true,
      id: slugify(props.label),
    }

    this.getCheckboxValues = ::this.getCheckboxValues
    this.toggle = ::this.toggle
  }

  getCheckboxValues() {
    const id = `#${this.state.id}`
    const type = '[type="checkbox"]'
    const sel = document.querySelector(id).querySelectorAll(type)
    const boxes = Array.prototype.slice.call(sel)
    return boxes.filter(b => b.checked).map(b => b.value)
  }

  toggle() {
    const { expanded } = this.state
    this.setState({ expanded: !expanded })
  }

  render() {
    const { label, onChange, options, type } = this.props
    const { expanded, id } = this.state
    let field
    let fn

    switch (type.toLowerCase()) {
      case 'checkbox':
        fn = () => onChange({ id, value: this.getCheckboxValues() })
        field = (
          <fieldset id={id} onChange={fn}>
            {options.map((o, i) => (
              <label key={i} htmlFor={`${id}[${slugify(o)}]`}>
                <input
                  type='checkbox'
                  id={`${id}[${slugify(o)}]`}
                  value={slugify(o)}
                />
                {o}
              </label>
            ))}
          </fieldset>
        )
        break;
      default:
        fn = e => onChange({ id, value: e.target.value })
        field = (
          <select className='fit' id={id} onChange={fn}>
            { options.map((o, i) => (
              <option key={i}>{o}</option>
            ))}
          </select>
        )
    }
    return (
      <div className='filter flex flex-column px2' aria-expanded={expanded}>
        <label
          className='h3 block'
          htmlFor={id}
          onClick={() => this.toggle()}
        >
          {label}
        </label>
        {field}
      </div>
    )
  }
}

Filter.defaultProps = {
  type: 'select',
  options: [],
  onChange: () => {},
}

Filter.propTypes = {
  type: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
}
