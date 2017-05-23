import React, { Component } from 'react'

import AgencySearchResults from './AgencySearchResults'

class AgencySearch extends Component {
  state = { search: '', showSelection: true }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  handleClick = d => e => {
    e.preventDefault()
    this.setState({ search: '', showSelection: true })
    this.props.onChange({ place: d.ori, placeType: 'agency' })
  }

  removeSelection = () => {
    this.setState({ showSelection: false, search: '' })
  }

  render() {
    const { agencies, ori, state } = this.props
    const { showSelection, search } = this.state

    const data = Object.keys(agencies[state]).map(agencyOri => {
      const agency = agencies[state][agencyOri]
      return { ori: agencyOri, ...agency }
    })
    const selected = data.find(d => d.ori === ori)

    const searchUpper = search.toUpperCase()
    const dataFiltered = searchUpper === ''
      ? data
      : data.filter(d => {
          const words = `${d.ori} ${d.agency_name}`.toUpperCase()
          return words.includes(searchUpper)
        })

    const showOris = !!search.length && dataFiltered.length > 0

    return (
      <div className="mt2">
        {selected && showSelection
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
              </div>
              {showOris &&
                <AgencySearchResults
                  data={dataFiltered.sort(
                    (a, b) => a.agency_name > b.agency_name,
                  )}
                  onClick={this.handleClick}
                />}
            </div>}
      </div>
    )
  }
}

export default AgencySearch
