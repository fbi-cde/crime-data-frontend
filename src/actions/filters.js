import { FILTER_RESET, FILTERS_UPDATE } from './constants'
import offenses from '../util/offenses'
import { lookupUsa } from '../util/usa2'

export const resetFilter = ({ id }) => ({ type: FILTER_RESET, id })

export const updateFilters = filters => {
  const { crime, place, placeType } = filters
  const cleaned = { ...filters }

  if (crime && !offenses.includes(crime)) delete cleaned.crime

  if (place && placeType !== 'agency') {
    const details = lookupUsa(place)
    if (!details) delete cleaned.place
    else cleaned.placeDetails = details
  }

  return { type: FILTERS_UPDATE, filters: cleaned }
}
