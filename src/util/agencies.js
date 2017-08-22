/* eslint-disable camelcase,consistent-return */
import reduceEntries from 'reduce-entries'

import lookupUsa from './usa'

const postalMappingExceptions = {
  NB: 'NE',
  GM: 'GU',
}

export const reshapeData = data =>
  Object.keys(data)
    .filter(key => lookupUsa(key))
    .map(key => ({ key: lookupUsa(key).slug, value: data[key] }))
    .reduce(reduceEntries())

export const oriToState = ori => {
  const oriAbbr = ori.slice(0, 2).toUpperCase()
  const postalAbbr = postalMappingExceptions[oriAbbr] || oriAbbr
  return lookupUsa(postalAbbr).slug
}

export const agencyDisplay = ({ agency_name, agency_type_name }) => {
  if (!agency_type_name) return agency_name
  return `${agency_name}`
}

export const getAgency = (agencies, ori) => {
  const usState = oriToState(ori)
  const agency = (agencies.data[usState] || {})[ori]

  if (!agency) return
  return { ...agency, display: agencyDisplay(agency) }
}
