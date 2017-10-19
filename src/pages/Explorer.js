import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AboutTheData from '../components/AboutTheData'
import AgencyChartContainer from '../containers/AgencyChartContainer'
import ExplorerHeaderContainer from '../containers/ExplorerHeaderContainer'
import NibrsContainer from '../containers/NibrsContainer'
import NotFound from './NotFound'
import SharingTags from '../components/SharingTags'
import SidebarContainer from '../containers/SidebarContainer'
import SparklineContainer from '../containers/SparklineContainer'
import TrendContainer from '../containers/TrendContainer'

import { updateApp } from '../actions/composite'
import { showTerm } from '../actions/glossary'
import { hideSidebar, showSidebar } from '../actions/sidebar'
import offensesUtil from '../util/offenses'
import { getAgency } from '../util/agencies'
import { getPlaceInfo } from '../util/place'
import { sentenceCase } from '../util/text'
import lookup from '../util/usa'
import { MIN_YEAR, MAX_YEAR } from '../util/years'

class Explorer extends React.Component {
  componentDidMount() {
    const { actions, filters, params, router} = this.props
    const { since, until } = filters
    const { query } = router.location
    const { place, placeType } = getPlaceInfo(params)
    const clean = (val, alt) => {
      const yr = +val
      return yr >= MIN_YEAR && yr <= MAX_YEAR ? yr : alt
    }

    actions.updateApp({
      ...params,
      place,
      placeType,
      ...query,
      since: clean(query.since, since),
      until: clean(query.until, until),
    })
  }

  componentWillReceiveProps({ params: newParams }) {
    const { actions, filters } = this.props
    const { crime } = newParams
    const newPlace = getPlaceInfo(newParams)

    if (filters.place !== newPlace.place) {
      actions.updateApp({ crime, ...newPlace })
    }
  }

  handleSidebarChange = change => {
    const { actions, router } = this.props
    actions.updateApp(change, router)
  }

  toggleSidebar = () => {
    const { actions, isOpen } = this.props
    if (isOpen) {
      actions.hideSidebar()
    } else {
      actions.showSidebar()
    }
  }

  render() {
    const { actions, agencies, filters, params } = this.props
    const { crime } = params
    const { place, placeType } = getPlaceInfo(params)
    const agency = placeType === 'agency' && getAgency(agencies, place)
    const placeDisplay = agency ? agency.agency_name : startCase(place)

    // ensure app state place matches url params place
    if (filters.place && filters.place !== place) return null

    // show not found page if crime or place unfamiliar
    if (!offensesUtil.includes(crime) || !lookup(place, placeType)) {
      return <NotFound />
    }

    return (
      <div className="site-wrapper">
        <Helmet title="CDE :: Explorer" />
        <SharingTags
          title={`${sentenceCase(crime)} reported ${placeType === 'agency'
            ? 'by the'
            : 'in'} ${placeDisplay}`}
        />
        <div className="sticky top-0">
          <div className="inline-block p1 bg-red-bright rounded-br md-hide lg-hide">
            <button
              className="btn p1 line-height-1 border-none"
              onClick={this.toggleSidebar}
            >
              <img
                className="align-middle"
                width="22"
                height="20"
                src="/img/filters.svg"
                alt="filters"
              />
            </button>
          </div>
        </div>
        <SidebarContainer
          ariaControls="explorer"
          onChange={this.handleSidebarChange}
        />
        <div className="site-content" id="explorer">
          <div className="container-main mx-auto px2 md-py3 lg-px3">
            <ExplorerHeaderContainer />
            {agency && <SparklineContainer />}
            {agency ? <AgencyChartContainer /> : <TrendContainer />}
            <NibrsContainer />
            <AboutTheData
              crime={crime}
              onTermClick={term => actions.showTerm(term)}
            />
          </div>
        </div>
      </div>
    )
  }
}

Explorer.propTypes = {
  actions: PropTypes.shape({
    hideSidebar: PropTypes.func,
    showSidebar: PropTypes.func,
    showTerm: PropTypes.func,
    updateApp: PropTypes.func,
  }),
  agencies: PropTypes.object,
  filters: PropTypes.object,
  params: PropTypes.object,
  router: PropTypes.object,
}

Explorer.defaultProps = {
  isOpen: false,
}

const mapStateToProps = ({ agencies, filters }) => ({ agencies, filters })
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { hideSidebar, showSidebar, showTerm, updateApp },
    dispatch,
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Explorer)
