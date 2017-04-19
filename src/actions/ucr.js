import {
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED,
} from './constants'
import api from '../util/api'


export const fetchingUcrParticipation = () => ({
  type: UCR_PARTICIPATION_FETCHING,
})

export const receivedUcrParticipation = results => ({
  type: UCR_PARTICIPATION_RECEIVED,
  results,
})

export const fetchUcrParticipation = params => dispatch => {
  dispatch(fetchingUcrParticipation())

  const requests = api.getUcrParticipationRequests(params)

  return Promise.all(requests).then(data => {
    const results = Object.assign(
      ...data.map(d => ({ [d.place]: d.results })),
    )

    dispatch(receivedUcrParticipation(results))
  })
}
