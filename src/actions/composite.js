/* eslint-disable import/prefer-default-export */
import { updateFilters } from './filters'
import { fetchNibrs } from './nibrs'
import { fetchSummaries } from '../actions/summary'
import { fetchUcrParticipation } from '../actions/ucr'
import history, { createNewLocation } from '../util/history'
import { nationalKey } from '../util/usa'
import ucrDataCoverage from '../util/ucr'

export const shouldFetchUcr = ({ place }) => place !== nationalKey
export const shouldFetchSummaries = ({ crime, place }) => crime && place
export const shouldFetchNibrs = ({ place }) => {
  const coverage = ucrDataCoverage(place)
  return coverage && coverage.nibrs
}

const fetchData = () => (dispatch, getState) => {
  const { filters } = getState()

  if (shouldFetchUcr(filters)) dispatch(fetchUcrParticipation(filters.place))
  if (shouldFetchSummaries(filters)) dispatch(fetchSummaries(filters))
  if (shouldFetchNibrs(filters)) dispatch(fetchNibrs(filters))
}

export const updateApp = (change, location) => dispatch => {
  dispatch(updateFilters(change))

  if (location) {
    history.push(createNewLocation({ change, location }))
  }

  return dispatch(fetchData())
}
