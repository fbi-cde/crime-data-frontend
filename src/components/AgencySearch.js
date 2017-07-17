import PropTypes from 'prop-types'
import React, { Component } from 'react'

import AgencySearchResults from './AgencySearchResults'
import OnEscape from './OnEscape'
import { oriToState } from '../util/agencies'

class AgencySearch extends Component {
  constructor(props) {
    super(props)

    const search = props.agency
    const hasSelection = !!search
    this.state = { search, hasSelection, showResults: props.initialShowResults }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillReceiveProps({ agency, initialShowResults }) {
    if (initialShowResults !== this.props.initialShowResults) {
      this.setState({ showResults: initialShowResults })
    }
    if (agency === '') {
      this.setState({ search: '', hasSelection: false })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }

  handleChange = e => {
    this.setState({
      search: e.target.value,
      hasSelection: false,
      showResults: true,
    })
  }

  handleClick = e => {
    if (this.state.showResults && !e.target.closest('.agency-search')) {
      this.setState({ showResults: false })
    }
    return e
  }

  handleEscape = e => {
    if (this.state.showResults) this.setState({ showResults: false })
    return e
  }

  handleResultsClick = d => e => {
    e.preventDefault()
    this.setState({ search: d.agency_name, hasSelection: true })
    this.props.onChange({ place: d.ori, placeType: 'agency' })
  }

  handleStateClick = usState => {
    this.setState({ showResults: false })
    this.props.onChange({ place: usState, placeType: 'state' })
  }

  clearInput = () => {
    this.setState({ search: '', hasSelection: false, showResults: true })
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
    const dataFiltered =
      searchUpper === ''
        ? data
        : data.filter(d => {
            const words = `${d.ori} ${d.agency_name}`.toUpperCase()
            return words.includes(searchUpper)
          })

    return (
      <div className="agency-search mt2">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              className="col-12 pr5 field field-sm fs-14 bold bg-white border-blue rounded-none placeholder-blue placeholder-fw-100 truncate"
              placeholder="Search for an agency"
              value={search}
              onChange={this.handleChange}
            />
            <button
              className="absolute right-0 btn line-height-1 border-none"
              style={{
                padding: '.5rem .75rem',
                borderLeft: '1px solid #284152',
              }}
              onClick={hasSelection ? this.clearInput : this.toggleResults}
            >
              {hasSelection
                ? <img
                    src="/img/x-navy.svg"
                    alt="close"
                    width="10"
                    height="10"
                  />
                : <img
                    src="/img/chevron-down-navy.svg"
                    alt="see results"
                    width="12"
                    height="12"
                  />}
            </button>
          </div>
          {!hasSelection &&
            showResults &&
            dataFiltered.length > 0 &&
            <OnEscape handler={this.handleEscape}>
              <AgencySearchResults
                data={dataFiltered.sort(
                  (a, b) => a.agency_name > b.agency_name,
                )}
                groupKey="primary_county"
                groupValues={Object.keys(counties).sort()}
                onResultsClick={this.handleResultsClick}
                onStateClick={this.handleStateClick}
                usState={oriToState(data[0].ori)}
              />
            </OnEscape>}
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
  initialShowResults: true,
}

export default AgencySearch
