import range from 'lodash.range'
import React from 'react'
import startCase from 'lodash.startcase'

import ucrProgram from '../../data/ucr-program-participation.json'
import ucrStateCodes from '../../data/ucr-state-codes.json'

const nibrsStates = Object.keys(ucrProgram).map(s => s).filter(s => {
  const state = ucrProgram[s]
  return state.nibrs || state.hybrid
}).map(s => ({
  text: startCase(s),
  value: ucrStateCodes[s],
}))

const firstYear = 2000
const numberOfYears = 15
const nibrsYears = range(numberOfYears).map(x => x + firstYear)

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

    this.handleClick = ::this.handleClick
    this.handleSelectChange = ::this.handleSelectChange
  }

  handleClick(e) {
    e.preventDefault()
    const { place, year } = this.state
    downloadBulkNibrs(year, place)
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
    const isBtnDisabled = !(this.state.place && this.state.year)

    return (
      <div className='mb8'>
        <h2 className='mt0 mb4 pb1 fs-22 sm-fs-32 border-bottom border-blue-lighter'>
          Download incident data by state and year
        </h2>
        <p className='mb4 fs-18 sm-fs-24 serif'>
          To view all attributes of incident data (NIBRS) join CSV downloads into a pivot table.
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
                  <option key={i} value={s.value}>{s.text}</option>
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
