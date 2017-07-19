import { nationalKey } from './usa'

const national = {
  place: nationalKey,
  placeType: 'national',
}

export const getPlaceInfo = (data = {}) => {
  const { place, placeType } = data
  if (!place || !placeType) return national
  return { place, placeType }
}
