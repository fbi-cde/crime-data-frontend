import React from 'react'

const bulkNibrs = 'http://s3-us-gov-west-1.amazonaws.com/cg-d3f0433b-a53e-4934-8b94-c678aa2cbaf3'
const createBulkNibrsUrl = (year, state) => (
  `${bulkNibrs}/${year}/${state}-${year}.zip`
)

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
    const border = 'border-bottom border-blue-lighter'
    const isBtnDisabled = !(this.state.place && this.state.year)
    return (
      <div>
        <h2 className={`${border} mb2 fs-22 sm-fs-32`}>
          Download incident data by state and year
        </h2>
        <p className='fs-24'>
          To view all attributes of incident data (NIBRS) join CSV downloads into a pivot table.
        </p>
        <form className='p2 sm-p4 bg-blue-lighter'>
          <fielset className='clearfix'>
            <legend>Choose a file to download</legend>
            <div className='col col-5'>
              <label htmlFor='nibrs-state'>Select a place</label>
              <select
                className='sm-fs-18 bold field'
                id='nibrs-state'
                onChange={this.handleSelectChange}
              >
                <option value='01'>AL</option>
                <option value='03'>AR</option>
                <option value='02'>AZ</option>
                <option value='05'>CO</option>
                <option value='06'>CT</option>
                <option value='08'>DC</option>
                <option value='07'>DE</option>
                <option value='14'>IA</option>
                <option value='11'>ID</option>
                <option value='12'>IL</option>
                <option value='13'>IN</option>
                <option value='15'>KS</option>
                <option value='16'>KY</option>
                <option value='17'>LA</option>
                <option value='20'>MA</option>
                <option value='18'>ME</option>
                <option value='21'>MI</option>
                <option value='24'>MO</option>
                <option value='23'>MS</option>
                <option value='25'>MT</option>
                <option value='26'>NE</option>
                <option value='33'>ND</option>
                <option value='28'>NH</option>
                <option value='34'>OH</option>
                <option value='35'>OK</option>
                <option value='36'>OR</option>
                <option value='37'>PA</option>
                <option value='38'>RI</option>
                <option value='39'>SC</option>
                <option value='40'>SD</option>
                <option value='41'>TN</option>
                <option value='42'>TX</option>
                <option value='43'>UT</option>
                <option value='45'>VA</option>
                <option value='44'>VT</option>
                <option value='46'>WA</option>
                <option value='48'>WI</option>
                <option value='47'>WV</option>
              </select>
            </div>
            <div className='col col-4'>
              <label htmlFor='nibrs-year'>Select a year</label>
              <select
                className='field'
                id='nibrs-year'
                onChange={this.handleSelectChange}
              >
                <option>2000</option>
                <option>2001</option>
                <option>2002</option>
                <option>2003</option>
                <option>2004</option>
                <option>2005</option>
                <option>2006</option>
                <option>2007</option>
                <option>2008</option>
                <option>2009</option>
                <option>2010</option>
                <option>2011</option>
                <option>2012</option>
                <option>2013</option>
                <option>2014</option>
              </select>
            </div>
            <button
              className='col col-3 btn btn-primary'
              disabled={isBtnDisabled}
              onClick={this.handleClick}
            >
              Download
            </button>
          </fielset>
        </form>
      </div>
    )
  }
}

export default DownloadBulkNibrs
