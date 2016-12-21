import React from 'react'

import { slugify } from '../util/text'

export default class FilterField extends React.Component {
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
    const { options } = this.props
    const { expanded, id } = this.state
    const fieldProps = {
      id,
      onChange: e => (
        this.props.onChange({ id, value: slugify(e.target.value) })
      ),
    }
    let field

    switch (this.props.type.toLowerCase()) {
      case 'select':
        field = (
          <select>
            {options.map((o, i) => (<option key={i}>{o}</option>))}
          </select>
        )
        break
      case 'radio':
        field = (
          <fieldset className='border-none p0'>
            {options.map((o, i) => (
              <label className='block' key={i} htmlFor={id}>
                <input
                  className='mr1'
                  name={id}
                  type='radio'
                  value={slugify(o)}
                />
                {o}
              </label>
            ))}
          </fieldset>
        )
        break
      default:
        field = (<input type={this.props.type} />)
    }
    const labelClass = (this.props.showLabel) ? '' : 'display-none'

    return (
      <div
        className={`flex flex-column ${this.props.className}`}
        aria-expanded={expanded}
      >
        <label
          className={`block bold border-bottom my1 ${labelClass}`}
          htmlFor={id}
        >
          {this.props.label}
        </label>
        {React.cloneElement(field, fieldProps)}
      </div>
    )
  }
}

FilterField.defaultProps = {
  className: '',
  showLabel: true,
  type: 'text',
}

FilterField.propTypes = {
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  type: React.PropTypes.string,
}
