/* eslint-disable camelcase,consistent-return */

import { slugify } from './text'
import lookupUsa from './usa'

const postalMappingExceptions = {
  NB: 'NE',
  GM: 'GU',
}

export const reshapeData = data =>
  Object.keys(data)
    .filter(key => lookupUsa(key))
    .map(key => ({ key: slugify(lookupUsa(key)), value: data[key] }))
    .reduce((accum, next) => ({ ...accum, [next.key]: next.value }), {})

export const oriToState = ori => {
  const oriAbbr = ori.slice(0, 2).toUpperCase()
  const postalAbbr = postalMappingExceptions[oriAbbr] || oriAbbr
  return slugify(lookupUsa(postalAbbr))
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
