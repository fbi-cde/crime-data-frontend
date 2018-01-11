import React from 'react'
import range from 'lodash.range'


import lookupUsa from '../util/usa'
import ucrProgram from '../../public/data/ucr-program-participation.json'
import { MAX_YEAR } from '../util/years'

const states = Object.keys(ucrProgram).filter(
  s => s !== 'united-states',
)

const bulkLeoka = 'http://s3-us-gov-west-1.amazonaws.com/cg-d3f0433b-a53e-4934-8b94-c678aa2cbaf3'

const createBulkLeokaUrl = (year, state) => {
  const s = state < 10 ? `0${state}` : state
  return `${bulkLeoka}/leoka/${year}/${s.toUpperCase()}-${year}.zip`
}

const downloadBulkLeoka = (year, state) => {
  const a = document.createElement('a')
  const body = document.querySelector('body')
  a.href = createBulkLeokaUrl(year, state.id)

  body.appendChild(a)
  a.click()
  body.removeChild(a)
}

class DownloadBulkLeoka extends React.Component {
  state = { place: null, year: null }

  getYearRange = () => range(1995, MAX_YEAR)

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

  handleClick = e => {
    e.preventDefault()
    const { place, year } = this.state
    downloadBulkLeoka(year, lookupUsa(place))
  }

  render() {
    const isBtnDisabled = !(this.state.place && this.state.year)
    const leokaYears = this.getYearRange()
    console.log('leokaYears:', leokaYears)
    return (
      <div>
        <form className="p2 sm-p4 bg-blue-white">
          <p className="fs-18 bold sans-serif">
            Download Leoka data by state and year
          </p>
          <div className="clearfix mxn1">
            <div className="sm-col sm-col-5 px1 mb2 sm-m0">
              <label className="hide" htmlFor="nibrs-state">
                Location
              </label>
              <select
                className="col-12 sm-fs-18 bold field select bg-white border-blue"
                id="nibrs-state"
                defaultValue="Location"
                onChange={this.handleSelectChange}
              >
                <option value="Location" disabled>
                  Location
                </option>
                {states.sort().map((s, i) => (
                  <option key={i} value={s}>
                    {lookupUsa(s).display}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm-col sm-col-4 px1 mb2 sm-m0">
              <label className="hide" htmlFor="nibrs-year">
                Year
              </label>
              <select
                className="col-12 sm-fs-18 bold field select bg-white border-blue"
                id="nibrs-year"
                defaultValue="Year"
                onChange={this.handleSelectChange}
              >
                <option value="Year" disabled>
                  Year
                </option>
                {leokaYears.map((y, i) => <option key={i}>{y}</option>)}
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

export default DownloadBulkLeoka
