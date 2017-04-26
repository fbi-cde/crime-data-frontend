import range from 'lodash.range'
import startCase from 'lodash.startcase'
import React from 'react'

import Term from './Term'
import ucrProgram from '../../data/ucr-program-participation.json'

/* these codes are repeated here (seemingly also in util/api.js) because
   different codes are needed for different parts of the application
*/
const ucrStateCodes = {
  alabama: 1,
  arizona: 2,
  arkansas: 3,
  colorado: 6,
  connecticut: 6,
  delaware: 7,
  'district-of-columbia': 8,
  georgia: 13,
  idaho: 11,
  illinois: 12,
  indiana: 13,
  iowa: 14,
  kansas: 15,
  kentucky: 16,
  louisiana: 17,
  maine: 18,
  massachusetts: 23,
  michigan: 21,
  mississippi: 23,
  missouri: 24,
  montana: 25,
  nebraska: 26,
  'new-hampshire': 28,
  nevada: 26,
  'north-dakota': 33,
  ohio: 24,
  oklahoma: 35,
  oregon: 36,
  pennsylvania: 37,
  'rhode-island': 38,
  'south-carolina': 39,
  'south-dakota': 40,
  tennessee: 41,
  texas: 42,
  utah: 43,
  vermont: 44,
  virginia: 45,
  washington: 46,
  wisconsin: 48,
  'west-virginia': 47,
}

const nibrsStates = Object.keys(ucrProgram).filter(
  s => s !== 'united-states' && ucrProgram[s].nibrs,
)

const bulkNibrs =
  'http://s3-us-gov-west-1.amazonaws.com/cg-d3f0433b-a53e-4934-8b94-c678aa2cbaf3'
const createBulkNibrsUrl = (year, state) => {
  const s = state < 10 ? `0${state}` : state
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

    return range(2014 + 1 - initialYear).map(y => initialYear + y)
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
      <Term
        dispatch={dispatch}
        id="national incident-based reporting system (nibrs)"
      >
        incident-based (NIBRS)
      </Term>
    )
    const nibrsYears = this.getYearRange(this.state.place)

    return (
      <div className="mb8">
        <p className="mb4 fs-18 sm-fs-24 serif">
          See {nibrsTerm} data by offense, location, victim and offender
          demographics, and arrestee. For more information, please see the{' '}
          <a className="bold" href="/pdf/README.pdf">README</a> and{' '}
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
                onChange={this.handleSelectChange}
              >
                <option disabled selected>Location</option>
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
                onChange={this.handleSelectChange}
              >
                <option disabled selected>Year</option>
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
