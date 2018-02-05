import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import startCase from 'lodash.startcase'

import Loading from '../components/Loading'
import ErrorCard from '../components/ErrorCard'
import LeokaCard from '../components/leoka/LeokaCard'
import LeokaIntro from '../components/leoka/LeokaIntro'
import { getPlaceInfo } from '../util/place'
import { rangeYears } from '../util/years'

import lookupUsa from '../util/usa'
import { getAgency } from '../util/agencies'

class LeokaContainer extends React.Component {
  constructor(props) {
    super(props)
    const { until } = props
    this.state = { yearSelected: until }
  }


  getCards(data, place) {
    const cards = []
    let cnt = -1;
    Object.keys(data).forEach(d => {
      const obj = data[d]
      cnt += 1;
      cards.push(
        <div key={cnt} className={'col col-12 sm-col-12 mb2 px1'}>
          <LeokaCard
            data={obj}
            place={place}
            year={this.state.yearSelected}
          />
        </div>)
    })
    return cards
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }


  render() {
<<<<<<< HEAD
    const { leoka, place, since, until, placeType, pageType, isAgency, agency } = this.props
    if (leoka.loading === true) return <Loading />
    if (leoka.error) return <ErrorCard error={leoka.error} />
    const placeDisplay = isAgency ? agency.display : lookupUsa(place).display
    const filterDataByRange = leoka.data
    const yrRange = rangeYears(since, until);
    const handleSelectChange = e => this.updateYear(Number(e.target.value))

    return (
      <div className="mb6">
          <div>
            <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
              <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
                Officers {startCase(pageType)} reported by {placeDisplay}
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
              <div>
                <LeokaIntro
                  pageType={pageType}
                  year={this.state.yearSelected}
                />
              </div>
            </div>
          </div>
          {this.getCards(filterDataByRange, place)}
          <div>
            <div className="serif italic fs-12">
              Footnotes:
            </div>
            <div className="serif italic fs-12">
              LEOKA Data
            </div>
          </div>
      </div>
    )
=======
    return (<div>Test</div>)
>>>>>>> master
  }
}

LeokaContainer.propTypes = {
  leoka: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ leoka, filters, agencies }) => {
  const { since, until, pageType } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)

  return {
    place,
    placeType,
    since,
    until,
    leoka,
    pageType,
    isAgency,
    agency
    }
}

export default connect(mapStateToProps)(LeokaContainer)
