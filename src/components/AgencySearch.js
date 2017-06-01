import PropTypes from 'prop-types'
import React, { Component } from 'react'

import AgencySearchResults from './AgencySearchResults'

class AgencySearch extends Component {
  constructor(props) {
    super(props)

    const search = props.agency
    const hasSelection = !!search
    this.state = { search, hasSelection, showResults: props.initialShowResults }
  }

  componentWillReceiveProps({ initialShowResults }) {
    const isSame = initialShowResults === this.props.initialShowResults
    if (isSame) return

    this.setState({ showResults: initialShowResults })
  }

  handleChange = e => {
    this.setState({
      search: e.target.value,
      hasSelection: false,
      showResults: true,
    })
  }

  handleClick = d => e => {
    e.preventDefault()
    this.setState({ search: d.agency_name, hasSelection: true })
    this.props.onChange({ place: d.ori, placeType: 'agency' })
  }

  clearInput = () => {
    this.setState({ search: '', hasSelection: false })
  }

  toggleResults = () => {
    this.setState(prevState => ({ showResults: !prevState.showResults }))
  }

  render() {
    const { data } = this.props
    const { search, hasSelection, showResults } = this.state

    // get unique set of counties (for result grouping)
    const counties = {}
    data.forEach(d => (counties[d.primary_county || 'N/A'] = true))

    const searchUpper = search.toUpperCase()
    const dataFiltered = searchUpper === ''
      ? data
      : data.filter(d => {
          const words = `${d.ori} ${d.agency_name}`.toUpperCase()
          return words.includes(searchUpper)
        })

    return (
      <div className="mt2">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              className="col-12 field field-sm bold bg-white border-blue rounded-none"
              placeholder="Search for an agency..."
              value={search}
              onChange={this.handleChange}
            />
            <button
              className="absolute btn p0 line-height-1"
              style={{ top: '.5rem', right: '1rem' }}
              onClick={hasSelection ? this.clearInput : this.toggleResults}
            >
              <img
                src={`/img/${hasSelection ? 'x-navy' : 'chevron-down-navy'}.svg`}
                alt="close"
                width="12"
                height="12"
              />
            </button>
          </div>
          {!hasSelection &&
            showResults &&
            dataFiltered.length > 0 &&
            <AgencySearchResults
              data={dataFiltered.sort((a, b) => a.agency_name > b.agency_name)}
              groupKey="primary_county"
              groupValues={Object.keys(counties).sort()}
              onClick={this.handleClick}
            />}
        </div>
      </div>
    )
  }
}

AgencySearch.propTypes = {
  agency: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialShowResults: PropTypes.bool,
}

AgencySearch.defaultProps = {
  initialShowResults: false,
}

export default AgencySearch
