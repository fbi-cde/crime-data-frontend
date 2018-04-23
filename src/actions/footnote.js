import { FOOTNOTE_FAILED, FOOTNOTE_FETCHING, FOOTNOTE_RECEIVED } from './constants'
import api from '../util/api'

export const failedFootnote = error => ({
  type: FOOTNOTE_FAILED,
  error,
})

export const fetchingFootnote = () => ({
  type: FOOTNOTE_FETCHING,
})

export const receivedFootnote = footnotes => ({
  type: FOOTNOTE_RECEIVED,
  footnotes,
})

export const fetchFootnote = filters => dispatch => {
  dispatch(fetchingFootnote())
  return api.fetchFootnotes(filters.place, filters.placeType, filters.pageType)
    .then(d => ({ data: d.results }))
    .then(summarized => dispatch(receivedFootnote(summarized)))
    .catch(error => dispatch(failedFootnote(error)))
}
