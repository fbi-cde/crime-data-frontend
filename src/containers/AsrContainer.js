import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import TableChart from '../components/graphs/TableChart'
import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import DownloadDataBtn from '../components/DownloadDataBtn'
import { getAgency } from '../util/agencies'
import { getPlaceInfo } from '../util/place'
import { nationalKey } from '../util/usa'
import lookupUsa from '../util/usa'
import api from '../util/api'
import { rangeYears } from '../util/years'
import { slugify } from '../util/text'

class AsrContainer extends React.Component {
  constructor(props) {
    super(props)
    const { until } = props
    this.state = { yearSelected: until }
  }

  getAsrByAgeContent = ({
    asr,
    place,
    placeDisplay,
    since,
    until,
    filters,
  }) => {

    let maleByAge = asr.data["male"]
    let femaleByAge = asr.data["female"]
    let year = this.state.yearSelected

    const downloadm = {
      data: maleByAge.data,
      filename: `${place}-asr-${slugify(maleByAge.noun
      )}-${year}.csv`,
    }

    const downloadf = {
      data: femaleByAge.data,
      filename: `${place}-asr-${slugify(femaleByAge.noun
      )}-${year}.csv`,
    }

    return (
      <div>
        <h2 className="mt0 mb2 pb1 fs-18 sm-fs-22 sans-serif blue border-bottom border-blue-light">
          {maleByAge.noun} (Male)
        </h2>
        <TableChart data={maleByAge} year={this.state.yearSelected} disableSort={true}/>
        <div className="mt-tiny">
            <span className="bold caps fs-12 red">
              Reported Offenses
            </span>
        </div>
        <DownloadDataBtn
            ariaLabel={`Download ${maleByAge.noun} data as a CSV`}
            data={downloadm}
            filename={`${place}-asr-${slugify(maleByAge.noun)}-${year}`}
            text="Download data"
            />
        <h2 className="mb2 pb1 fs-18 sm-fs-22 sans-serif blue border-bottom border-blue-light">
          {femaleByAge.noun} (Female)
        </h2>
        <TableChart data={femaleByAge} year={this.state.yearSelected} disableSort={true}/>
        <div className="mt-tiny">
            <span className="bold caps fs-12 red">
              Reported Offenses
            </span>
        </div>
        <DownloadDataBtn
            ariaLabel={`Download ${femaleByAge.noun} data as a CSV`}
            data={downloadf}
            filename={`${place}-asr-${slugify(femaleByAge.noun)}-${year}`}
            text="Download data"
            />
      </div>
    )
  }

  getAsrByRaceContent = ({
    asr,
    place,
    placeDisplay,
    since,
    until,
    filters,
  }) => {

    let raceData = asr.data["race"]
    let raceYouthData = asr.data["race-youth"]
    let year = this.state.yearSelected

    const downloadr = {
      data: raceData.data,
      filename: `${place}-asr-${slugify(raceData.noun
      )}-${year}.csv`,
    }

    const downloadyth = {
      data: raceYouthData.data,
      filename: `${place}-asr-${slugify(raceYouthData.noun
      )}-${year}.csv`,
    }

    return (
      <div>
        <h2 className="mt0 mb2 pb1 fs-18 sm-fs-22 sans-serif blue border-bottom border-blue-light">
          {raceData.noun}
        </h2>
        <TableChart data={raceData} year={this.state.yearSelected}/>
        <div className="mt-tiny">
            <span className="bold caps fs-12 red">
              Reported Offenses
            </span>
        </div>
        <DownloadDataBtn
            ariaLabel={`Download ${raceData.noun} data as a CSV`}
            data={downloadr}
            filename={`${place}-asr-${slugify(raceData.noun)}-${year}`}
            text="Download data"
            />
        <h2 className="mb2 pb1 fs-18 sm-fs-22 sans-serif blue border-bottom border-blue-light">
          {raceYouthData.noun} (Youth)
        </h2>
        <TableChart data={raceYouthData} year={this.state.yearSelected}/>
        <div className="mt-tiny">
            <span className="bold caps fs-12 red">
              Reported Offenses
            </span>
        </div>
        <DownloadDataBtn
            ariaLabel={`Download ${raceYouthData.noun} data as a CSV`}
            data={downloadyth}
            filename={`${place}-asr-${slugify(raceYouthData.noun)}-${year}`}
            text="Download data"
            />
      </div>
    )
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  render() {
    const { agency, isAgency, asr, place, placeType, since, until, filters } = this.props
    const placeDisplay = isAgency ? agency.display : lookupUsa(place).display
    const yrRange = rangeYears(since, until);
    const handleSelectChange = e => this.updateYear(Number(e.target.value))
    const showAsrByAge = filters.pageType === 'asr-age'
    const showAsrByRace = filters.pageType === 'asr-race'

    return (
      <div className="mb6">
        <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
          <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
            {placeDisplay} Arrests
          </h2>
          <div className='mb3'>
            <label htmlFor="year-selected" className="hide">
              Year selected
            </label>
            <select
                className="field field-sm select select-dark col-10"
                id="year-selected"
                onChange={handleSelectChange}
                value={this.state.yearSelected}
            >
                {yrRange.map((y, i) =>
                  <option key={i}>
                    {y}
                  </option>,
                )}
            </select>
          </div>
          <div className="m0 sm-col-10">
            <p>
              The following information concerns demographics of persons arrested in relation to a crime.
            </p>
          </div>
          <div>
            {showAsrByAge && this.getAsrByAgeContent({ asr, place, placeType, placeDisplay, since, until, filters })}
            {showAsrByRace && this.getAsrByRaceContent({ asr, place, placeType, placeDisplay, since, until, filters })}
          </div>
        </div>
      </div>
    )
  }
}

AsrContainer.propTypes = {
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, asr, filters }) => {
  const { since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)

  return {
    filters,
    asr,
    agency,
    isAgency,
    place,
    placeType,
    since,
    until,
  }
}

export default connect(mapStateToProps)(AsrContainer)
