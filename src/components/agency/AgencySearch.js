import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import AgencySearchResults from './AgencySearchResults'
import OnEscape from '../OnEscape'
import { newOriToState } from '../../util/agencies'

class AgencySearch extends Component {
  constructor(props) {
    super(props)

    const search = props.agency
    const hasSelection = !!search
    this.state = {
      search,
      hasSelection,
      showResults: props.initialShowResults,
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillReceiveProps({ agency, initialShowResults }) {
    if (initialShowResults !== this.props.initialShowResults) {
      this.setState({ showResults: initialShowResults })
    }

    this.setState({
      search: agency,
      hasSelection: agency !== '',
    })
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
    const { data, states } = this.props
    const { search, hasSelection, showResults } = this.state
    console.log('showResults:', showResults)
    console.log('data.length:', Object.keys(data).length)

    // get unique set of counties (for result grouping)
    const countiesSet = new Set()

    Object.keys(data).forEach(agency => {
      if (data[agency].county_name === null) {
        countiesSet.add('N/A')
      } else {
        countiesSet.add(data[agency].county_name)
      }
    })
    /*
    Object.keys(data).forEach(data => {
      if (data[data].county_name === null) {
        counties.add('N/A')
      }else{
        counties.add(data[data].county_name)
      }
    })
    */
    console.log('AgencySearch: counties:', countiesSet)
    let selectedState
    if (data.length > 0) {
       selectedState = newOriToState(data[0].ori, states)
    }
    const counties = [...countiesSet]

    return (
      <div className="agency-search mt2">
        <div className="relative">
          <div className="relative">
            <input
              id="agencySearchInput"
              type="text"
              className="col-12 pr5 field field-sm fs-14 bold bg-white border-blue rounded-none placeholder-blue placeholder-fw-100 truncate border-blue"
              placeholder="Search for an agency"
              value={search}
              onChange={this.handleChange}
            />
            <button
              id="agencySearchBtn"
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
            data.length > 0 &&
            <OnEscape handler={this.handleEscape}>
              <AgencySearchResults
                data={data}
                groupKey="county_name"
                groupValues={counties.sort()}
                onResultsClick={this.handleResultsClick}
                onStateClick={this.handleStateClick}
                usState={selectedState}
              />
            </OnEscape>}
        </div>
      </div>
    )
  }
}

AgencySearch.propTypes = {
  agency: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  initialShowResults: PropTypes.bool,
  states: PropTypes.object.isRequired,
}

AgencySearch.defaultProps = {
  initialShowResults: true,
}

const mapStateToProps = ({ states }) => ({ states })

export default connect(mapStateToProps)(AgencySearch)
