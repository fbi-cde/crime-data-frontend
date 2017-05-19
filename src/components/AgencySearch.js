import axios from 'axios'
import React, { Component } from 'react'

import AgencySearchRefine from './AgencySearchRefine'
import AgencySearchResults from './AgencySearchResults'

class AgencySearch extends Component {
  state = {
    data: [],
    keyword: '',
    search: '',
    selected: null,
    isFetching: true,
    refine: false,
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

  refineInputHandler = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  removeSelection = () => {
    this.setState({ selected: null, search: '', keyword: '' })
  }

  render() {
    const { ori, state } = this.props
    const { data, keyword, search, selected, refine } = this.state

    const searchUpper = search.toUpperCase()
    const dataFiltered = data.filter(d => {
      const words = `
        ${d.agency_name} ${d.agency_type}
        ${d.city_name} ${d.county_name}
      `.toUpperCase()

      return words.includes(searchUpper)
    })

    const showRefinement = false
    const hasSearch = searchUpper.length || keyword
    const showOris = hasSearch && dataFiltered.length > 0

    return (
      <div className="mt2">
        {selected
          ? <div className="mb2 relative">
              <input
                type="text"
                className="col-12 field field-sm bg-white border-blue pr5 truncate"
                defaultValue={selected.agency_name}
              />
              <button
                className="absolute btn p0 line-height-1"
                style={{ top: '.5rem', right: '1rem' }}
                onClick={this.removeSelection}
              >
                <img src="/img/x-navy.svg" alt="close" width="12" height="12" />
              </button>
            </div>
          : <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  className="col-12 field field-sm bg-white border-blue rounded-none"
                  placeholder="Search for an agency..."
                  value={search}
                  onChange={this.handleChange}
                />
                {showRefinement &&
                  <button
                    className="absolute btn p0 line-height-1"
                    style={{ top: '.5rem', right: '1rem' }}
                    onClick={this.refineToggle}
                  >
                    <img
                      src="/img/chevron-down-navy.svg"
                      alt="expand"
                      width="12"
                      height="12"
                    />
                  </button>}
              </div>
              {showOris &&
                <AgencySearchResults
                  data={dataFiltered}
                  onClick={this.handleClick}
                />}
              {refine &&
                <AgencySearchRefine
                  keyword={keyword}
                  onChange={this.refineInputHandler}
                  onSubmit={this.refineSubmit}
                />}
            </div>}
      </div>
    )
  }
}

export default AgencySearch
