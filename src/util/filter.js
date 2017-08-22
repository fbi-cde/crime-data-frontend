import lookupUsa from '../util/usa'
import offenses from '../util/offenses'
import { MAX_YEAR } from '../util/years'

const defaults = {
  crime: 'violent-crime',
  place: 'united-states',
  since: MAX_YEAR - 10,
  until: MAX_YEAR,
}

const isValidCrime = crime => offenses.includes(crime)

const validateCrime = crime => {
  if (!crime || !isValidCrime(crime)) return defaults.crime
  return crime
}

const validatePlace = place => {
  if (!place || !lookupUsa(place)) return defaults.place
  return place
}

const validateTime = (since, until) => {
  const filters = {}
  if (!since || since === null) filters.since = defaults.since
  if (!until || until === null) filters.until = defaults.until

  if (since && until && since > until) {
    filters.since = defaults.since
    filters.until = defaults.until
  } else if (since && until && until - since < 10) {
    filters.since = until - 10
    filters.until = until
  }
  return filters
}

const validateFilter = (filter = {}) => ({
  crime: validateCrime(filter.crime),
  place: validatePlace(filter.place),
  ...validateTime(filter.since, filter.until),
})

export { validateFilter as default }
