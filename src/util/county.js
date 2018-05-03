import { formatOneDec as formatRate } from '../util/formats'

export const calculateRates = counties => {
  console.log('counties:', counties)
  const countiesWithRates = []
  for (let i = 0; i < counties.length; i++) {
    const county = counties[i]

    county.rate = formatRate(
      county.actual_incident_count / county.population * 100000
    )
    countiesWithRates.push(county)
  }
  return countiesWithRates
}
