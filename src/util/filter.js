import lookupUsa from '../util/usa'
import offenses from '../util/offenses'

const isValidCrime = crime => offenses.includes(crime)

const defaults = {
  crime: 'violent-crime',
  place: 'united-states',
  since: 2004,
  until: 2014,
}

const validateFilter = filters => {
  const newFilters = { ...filters }
  if (filters.crime && !isValidCrime(filters.crime)) {
    newFilters.crime = defaults.crime
  }
  if (filters.place && !lookupUsa(filters.place)) {
    newFilters.place = defaults.place
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
