import range from 'lodash.range'
import React from 'react'
import startCase from 'lodash.startcase'

import Term from './Term'
import ucrProgram from '../../data/ucr-program-participation.json'
import ucrStateCodes from '../../data/ucr-state-codes.json'

const nibrsStates = Object.keys(ucrProgram).filter(s => ucrProgram[s].nibrs)

const bulkNibrs = 'http://s3-us-gov-west-1.amazonaws.com/cg-d3f0433b-a53e-4934-8b94-c678aa2cbaf3'
const createBulkNibrsUrl = (year, state) => {
  const s = (state < 10) ? `0${state}` : state
  return `${bulkNibrs}/${year}/${s}-${year}.zip`
}

const downloadBulkNibrs = (year, state) => {
  const a = document.createElement('a')
  a.href = createBulkNibrsUrl(year, state)
  a.click()
}

class DownloadBulkNibrs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      place: null,
      year: null,
    }

    this.getYearRange = ::this.getYearRange
    this.handleClick = ::this.handleClick
    this.handleSelectChange = ::this.handleSelectChange
  }

  getYearRange() {
    if (!this.state.place) return []
    const { nibrs } = ucrProgram[this.state.place]
    const initialYear = nibrs['initial-year']

    return range((2014 + 1) - initialYear).map(y => initialYear + y)
  }

  handleClick(e) {
    e.preventDefault()
    const { place, year } = this.state
    downloadBulkNibrs(year, ucrStateCodes[place])
  }

  handleSelectChange(e) {
    switch (e.target.id) {
      case 'nibrs-state':
        this.setState({ place: e.target.value })
        break
      case 'nibrs-year':
        this.setState({ year: e.target.value })
        break
      default:
        break
    }
  }

  render() {
    const { dispatch } = this.props
    const isBtnDisabled = !(this.state.place && this.state.year)
    const nibrsTerm = (
      <Term dispatch={dispatch} id='national incident-based reporting system (nibrs)'>
        incident-based (NIBRS)
      </Term>
    )
    const nibrsYears = this.getYearRange(this.state.place)

    return (
      <div className='mb8'>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-lighter'>
          Download incident-based reports by state and year
        </h2>
        <p className='mb4 fs-18 sm-fs-24 serif'>
          See {nibrsTerm} data by offense, location, and offender demographics.
        </p>
        <form className='p2 sm-p4 bg-blue-white'>
          <legend className='mb2 fs-18 sm-fs-22 bold'>Choose a file to download</legend>
          <div className='clearfix mxn1'>
            <div className='sm-col sm-col-5 px1 mb2 sm-m0'>
              <label className='hide' htmlFor='nibrs-state'>Select a place</label>
              <select
                className='col-12 sm-fs-18 bold field select bg-white'
                id='nibrs-state'
                onChange={this.handleSelectChange}
              >
                <option disabled selected>Select a place</option>
                {nibrsStates.map((s, i) => (
                  <option key={i} value={s}>{startCase(s)}</option>
                ))}
              </select>
            </div>
            <div className='sm-col sm-col-4 px1 mb2 sm-m0'>
              <label className='hide' htmlFor='nibrs-year'>Select a year</label>
              <select
                className='col-12 sm-fs-18 bold field select bg-white'
                id='nibrs-year'
                onChange={this.handleSelectChange}
              >
                <option disabled selected>Select a year</option>
                {nibrsYears.map((y, i) => (
                  <option key={i}>{y}</option>
                ))}
              </select>
            </div>
            <div className='sm-col sm-col-3 lg-col-2 px1 mb2 sm-m0'>
              <button
                className='col-12 btn btn-primary'
                disabled={isBtnDisabled}
                onClick={this.handleClick}
              >
                Download
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default DownloadBulkNibrs
