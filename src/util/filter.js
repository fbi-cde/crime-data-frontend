import lookupUsa from '../util/usa'
import offenses from '../util/offenses'

const isValidCrime = crime => offenses.includes(crime)

const defaults = {
  crime: 'violent-crime',
  place: 'united-states',
  since: 2004,
  until: 2014,
};


const validateFilter = (filter) => {

  //Validate Crime
  if (filter.crime && !isValidCrime(filter.crime)) filter.crime=defaults.crime;
  //Validate Place
  if(filter.place && !lookupUsa(filter.place)) filter.place = defaults.place;

  //Validate Since and Until
  if(filter.since && filter.until && filter.since>filter.until){
    filter.since = defaults.since;
    filter.until = defaults.until;
  }
  //Validate Crime
  if(filter.since && filter.until && ((filter.until-filter.since))<10) filter.since = filter.until-10;


  console.log("Request Filters Validated:",filter)
  return filter;

}

export { validateFilter as default}
