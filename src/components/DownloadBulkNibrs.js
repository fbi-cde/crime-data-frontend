import range from 'lodash.range'
import startCase from 'lodash.startcase'
import React from 'react'

import Term from './Term'
import lookupUsa from '../util/usa'
import ucrProgram from '../../public/data/ucr-program-participation.json'

const nibrsStates = Object.keys(ucrProgram).filter(
  s => s !== 'united-states' && ucrProgram[s].nibrs,
)

const bulkNibrs =
  'http://s3-us-gov-west-1.amazonaws.com/cg-d3f0433b-a53e-4934-8b94-c678aa2cbaf3'
const createBulkNibrsUrl = (year, state) => {
  const s = state < 10 ? `0${state}` : state
  return `${bulkNibrs}/${year}/${s.toUpperCase()}-${year}.zip`
}

const downloadBulkNibrs = (year, state) => {
  const a = document.createElement('a')
  const body = document.querySelector('body')
  a.href = createBulkNibrsUrl(year, state)

  body.appendChild(a)
  a.click()
  body.removeChild(a)
}

class DownloadBulkNibrs extends React.Component {
  state = { place: null, year: null }

  getYearRange = () => {
    if (!this.state.place) return []
    const { nibrs } = ucrProgram[this.state.place]
    const initialYear = nibrs['initial-year']

    return range(2014 + 1 - initialYear).map(y => initialYear + y)
  }

  handleClick = e => {
    e.preventDefault()
    const { place, year } = this.state
    downloadBulkNibrs(year, lookupUsa(place))
  }

  handleSelectChange = e => {
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
    const nibrsTerm = (
      <Term id="national incident-based reporting system (nibrs)" size="lg">
        incident-based (NIBRS)
      </Term>
    )
    const nibrsYears = this.getYearRange(this.state.place)

    return (
      <div className="mb8">
        <p className="mb4 fs-18 sm-fs-24 serif">
          See {nibrsTerm} data by offense, location, victim and offender
          demographics, and arrestee. For more information, please see the{' '}
          <a
            className="bold"
            href="https://github.com/18F/crime-data-explorer/blob/master/README.md"
          >
            README
          </a>
          {' '}
          and
          {' '}
          <a className="bold" href="/pdf/NIBRS-data-diagram.pdf">
            NIBRS data diagram
          </a>
          .
        </p>
        <form className="p2 sm-p4 bg-blue-white">
          <div className="clearfix mxn1">
            <div className="sm-col sm-col-5 px1 mb2 sm-m0">
              <label className="hide" htmlFor="nibrs-state">Location</label>
              <select
                className="col-12 sm-fs-18 bold field select bg-white"
                id="nibrs-state"
                defaultValue="Location"
                onChange={this.handleSelectChange}
              >
                <option value="Location" disabled>Location</option>
                {nibrsStates.map((s, i) => (
                  <option key={i} value={s}>{startCase(s)}</option>
                ))}
              </select>
            </div>
            <div className="sm-col sm-col-4 px1 mb2 sm-m0">
              <label className="hide" htmlFor="nibrs-year">Year</label>
              <select
                className="col-12 sm-fs-18 bold field select bg-white"
                id="nibrs-year"
                defaultValue="Year"
                onChange={this.handleSelectChange}
              >
                <option value="Year" disabled>Year</option>
                {nibrsYears.map((y, i) => <option key={i}>{y}</option>)}
              </select>
            </div>
            <div className="sm-col sm-col-3 px1 mb2 sm-m0">
              <button
                className="col-12 btn btn-primary"
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
