import axios from 'axios'
import React, { Component } from 'react'

import AgencySearchRefine from './AgencySearchRefine'
import AgencySearchResults from './AgencySearchResults'

const matches = (a, b) => a.toUpperCase().includes(b.toUpperCase())

const initRefinements = {
  agency_name: '',
  agency_type: '',
  city_name: '',
  county_name: '',
}

class AgencySearch extends Component {
  state = {
    data: [],
    search: '',
    selected: null,
    isFetching: true,
    refine: false,
    ...initRefinements,
  }

  componentDidMount() {
    axios
      .get('/data/agencies.json')
      .then(response => response.data)
      .then(data => this.setState({ data, isFetching: false }))
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  handleClick = datum => e => {
    e.preventDefault()
    this.setState({ selected: datum })
  }

  refineToggle = e => {
    e.preventDefault()
    this.setState(prevState => ({ refine: !prevState.refine }))
  }

  refineSubmit = () => {
    this.setState({ refine: false })
  }

  refineClear = () => {
    this.setState({ ...initRefinements })
  }

  refineInputHandler = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  removeSelection = () => {
    this.setState({ selected: null, search: '', ...initRefinements })
  }

  render() {
    const {
      data,
      search,
      selected,
      refine,
      agency_name,
      agency_type,
      city_name,
      county_name,
    } = this.state

    const searchUpper = search.toUpperCase()
    let dataFiltered = data.filter(d => {
      const words = `
        ${d.agency_name} ${d.agency_type}
        ${d.city_name} ${d.county_name}
      `.toUpperCase()

      return words.includes(searchUpper)
    })

    // TODO: refactor this grossness
    const hasRefinement = agency_name || agency_type || city_name || county_name
    if (hasRefinement) {
      dataFiltered = dataFiltered.filter(
        d =>
          (!agency_name ||
            (matches(d.agency_name, agency_name) ||
              matches(d.ori, agency_name))) &&
          matches(d.agency_type, agency_type) &&
          matches(d.city_name, city_name) &&
          matches(d.county_name, county_name),
      )
    }

    const hasSearch = searchUpper.length || hasRefinement
    const showOris = hasSearch && dataFiltered.length > 0

    return (
      <div className="mt2">
        {selected
          ? <div className="flex mb2">
              <input
                type="text"
                className="flex-auto col-12 m0 h5 field field-sm rounded-left"
                placeholder="Search..."
                defaultValue={selected['agency_name']}
              />
              <button
                className="btn btn-sm px2 bg-blue-white rounded-right"
                style={{ borderLeft: 0 }}
                onClick={this.removeSelection}
              >
                ✕
              </button>
            </div>
          : <div className="relative">
              <div className="flex">
                <input
                  type="text"
                  className="flex-auto col-12 m0 h5 field field-sm rounded-left"
                  placeholder="Search..."
                  value={search}
                  onChange={this.handleChange}
                />
                {!refine &&
                  <button
                    className="btn btn-sm px2 bg-blue-white rounded-right"
                    style={{ borderLeft: 0 }}
                    onClick={this.refineToggle}
                  >
                    ...
                  </button>}
              </div>
              {showOris &&
                <AgencySearchResults
                  data={dataFiltered}
                  onClick={this.handleClick}
                />}
              {refine &&
                <AgencySearchRefine
                  agency_name={agency_name}
                  agency_type={agency_type}
                  city_name={city_name}
                  county_name={county_name}
                  onClear={this.refineClear}
                  onChange={this.refineInputHandler}
                  onSubmit={this.refineSubmit}
                  onClose={this.refineToggle}
                />}
            </div>}
      </div>
    )
  }
}

export default AgencySearch
