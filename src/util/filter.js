import lookupUsa from '../util/usa';
import offenses from '../util/offenses';

const isValidCrime = crime => offenses.includes(crime);

const defaults = {
  crime: 'violent-crime',
  place: 'united-states',
  since: 2004,
  until: 2014,
};

const validateFilter = filter => {
  if (filter.crime && !isValidCrime(filter.crime)) { filter.crime = defaults.crime; }
  if (filter.place && !lookupUsa(filter.place)) filter.place = defaults.place;
  if (filter.since === null && filter.until === null) {
    filter.since = defaults.since;
    filter.until = defaults.until;
  }
  if (filter.since && filter.until && filter.since > filter.until) {
    filter.since = defaults.since;
    filter.until = defaults.until;
  }
  if (filter.since && filter.until && filter.until - filter.since < 10) { filter.since = filter.until - 10; }
  return filter;
};

export { validateFilter as default };
