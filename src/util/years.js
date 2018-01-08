import range from 'lodash.range'

export const rangeYears = (since, until) => range(since, until + 1)

export const MIN_YEAR = 1995
export const MAX_YEAR = 2016
export const YEAR_RANGE = rangeYears(MIN_YEAR, MAX_YEAR)
