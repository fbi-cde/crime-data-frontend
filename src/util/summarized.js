import { slugify } from '../util/text'
import { MIN_YEAR, MAX_YEAR } from '../util/years'

export const getYearData = (summaries, place, minYr) => summaries[place].filter(
    data => data.year === minYr
  )
export const calculateRates = (summaries, placeType) => {
  console.log('Calc Rates:', summaries, placeType)
}
  export const reshapeData = dataIn => {
    console.log('DataIn:', dataIn)
    Object.assign(...dataIn.map(d => ({ [d.key]: d.results })))
  }
