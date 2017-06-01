/* eslint-disable camelcase,consistent-return */

import { slugify } from './text'
import lookupUsa from './usa'

export const oriToState = ori => slugify(lookupUsa(ori.slice(0, 2)))

export const agencyDisplay = ({ agency_name, agency_type_name }) => {
  if (!agency_type_name) return agency_name
  return `${agency_name} ${agency_type_name}`
}

export const getAgency = (agencies, ori) => {
  const usState = oriToState(ori)
  const agency = agencies.data[usState][ori]

  if (!agency) return
  return { ...agency, display: agencyDisplay(agency) }
}
