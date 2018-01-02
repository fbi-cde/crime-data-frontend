import offenseUtil from '../util/offenses'
import { MAX_YEAR } from '../util/years'

const isValidCrime = crime => offenseUtil.includes(crime)

const defaults = {
  location: 'crime',
  pageType: 'violent-crime',
  place: 'united-states',
  placeType: 'national',
  placeid: 'usa',
  since: MAX_YEAR - 10,
  until: MAX_YEAR,
}

const validateFilter = filters => {
  const newFilters = { ...filters }
  if (filters.location === 'location' && filters.pageType && !isValidCrime(filters.pageType)) {
    newFilters.pageType = defaults.pageType
  }
  if (filters.location === null) {
    newFilters.location = defaults.location
  }

  if (filters.place === 'usa') {
    newFilters.place = defaults.place
    newFilters.placeType = defaults.placeType
    newFilters.placeId = defaults.placeId
  }

  if (filters.since === null && filters.until === null) {
    newFilters.since = defaults.since
    newFilters.until = defaults.until
  }
  if (filters.since && filters.until && filters.since > filters.until) {
    newFilters.since = defaults.since
    newFilters.until = defaults.until
  }

  if (filters.since && filters.until && filters.until - filters.since < 10) {
    newFilters.since = filters.until - 10
  }
  return newFilters
}

export { validateFilter as default }
