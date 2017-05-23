import { nationalKey } from './usa'

export const getPlaceInfo = ({ place, placeType }) => ({
  place: place || nationalKey,
  placeType: placeType || 'national',
})
