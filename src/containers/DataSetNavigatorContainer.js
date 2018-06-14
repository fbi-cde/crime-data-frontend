import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'

import Loading from '../components/Loading'
import VAWChart from '../components/vaw/VAWChart'
import DownloadDataBtn from '../components/downloads/DownloadDataBtn'
import lookupUsa from '../util/usa'
import { getPlaceInfo } from '../util/place'
import {
  vawDataSetCrimes,
  lookUpVAWCrimeByText
} from '../util/specializedDataSet'

import ucrParticipation, {
  shouldFetchNibrs as shouldShowNibrs
} from '../util/participation'

class DataSetNavigatorContainer extends React.Component {
  constructor(props) {
    super(props)
    const { param } = props
    this.state = { param }
  }

  render() {
    const {
      param,
      place,
      placeType,
      since,
      until,
      states,
      filters,
      pageType,
      onChange
    } = this.props

    return (
      <div>
        <div className="mb1 bg-white border-top border-blue border-w8">
          <div className="mb0 p2 sm-p4">
            <div className="mb3">
              <label htmlFor="vaw-data-selected" className="hide">
                Year selected
              </label>
              <select
                className="field field-sm select select-dark col-12"
                id="year-selected"
                onChange={e =>
                  onChange({
                    param: lookUpVAWCrimeByText(e.target.value).id,
                    page: 'dataset'
                  })
                }
                value={this.state.param}
              >
                {vawDataSetCrimes.map((y, i) => (
                  <option key={y.id}>{y.text}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DataSetNavigatorContainer.propTypes = {
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
  states: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = ({ filters, states }) => {
  const { since, until, param } = filters
  const { place, placeType, pageType } = getPlaceInfo(filters)

  return {
    param,
    place,
    placeType,
    since,
    until,
    states,
    pageType
  }
}

export default connect(mapStateToProps)(DataSetNavigatorContainer)
