import { slugify } from '../util/text'
import { MIN_YEAR, MAX_YEAR } from '../util/years'

export const getYearData = (summaries, place, minYr) => summaries[place].filter(
    data => data.year === minYr
  )

export const calculateRates = (summaries, placeType) => {
  const nonOffenseKeys = ['caveats', 'population', 'state_abbr', 'year']
  let places
  if (placeType !== 'region') {
    places = Object.keys(summaries).map(place => {
      const rates = summaries[place].map(yearly => {
        const offenses = Object.keys(yearly).filter(
          k => !nonOffenseKeys.includes(k),
        )
        const { population, year } = yearly
        const withRates = offenses.map(o => ({
          [slugify(o)]: {
            count: yearly[o],
            rate: yearly[o] / population * 100000,
          },
        }))
        return Object.assign({ population, year }, ...withRates)
      })

      return {
        [place]: rates,
      }
    })
  } else {
    places = Object.keys(summaries).map(place => {
        const withRegionRates = [];
        let minYr = MIN_YEAR
        const summaryObject = Object()
        do {
        const yrData = getYearData(summaries, place, minYr)
        if (yrData.length > 0) {
          const offensesObject = Object()
          const offenses = Object.keys(yrData[0]).filter(
            k => !nonOffenseKeys.includes(k),
          )
          let population = 0;
          Object.keys(offenses).forEach(o => {
            let pop = 0
            let cnt = 0;
            Object.keys(yrData).forEach(yr => {
              const year = yrData[yr];
              pop += year.population;
              cnt += year[offenses[o]];
              population = pop
            });
            const offenseObject = ({
                count: cnt,
                rate: cnt / pop * 100000,
            });
            const offenseString = slugify(offenses[o])
            offensesObject[offenseString] = offenseObject
          });
          offensesObject.year = minYr;
          offensesObject.population = population
          withRegionRates.push(offensesObject)
        }
        minYr += 1;
      } while (minYr <= MAX_YEAR)
      summaryObject[place] = withRegionRates;
      return summaryObject;
   })
  }
  return Object.assign(...places)
}


export const combinePlaces = (summaries, offenses = []) => {
  const places = Object.keys(summaries)
  const years = summaries[places[0]].map(y => y.year)

  return years.map(year =>
    Object.assign(
      { year },
      ...places.map(place => {
        const o = {}
        const yearData = summaries[place].find(y => y.year === year)
        offenses.forEach(offense => {
          o[offense] = yearData[offense]
        })

        return { [place]: { population: yearData.population, ...o } }
      }),
    ),
  )
}

export const filterByYear = (summaries, since, until) => {
  const places = Object.keys(summaries).map(place => {
    const filtered = summaries[place].filter(y => {
      const { year } = y
      if (since && until && +year >= since && +year <= until) return true
      else if (since && !until && since <= +year) return true
      else if (!since && until && until >= +year) return true
      return false
    })
    return {
      [place]: filtered,
    }
  })

  return Object.assign(...places)
}

export const reshapeData = dataIn =>
  Object.assign(...dataIn.map(d => ({ [d.key]: d.results })))
