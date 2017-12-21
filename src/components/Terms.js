import PropTypes from 'prop-types'
import React from 'react'

import Term from './Term'

const propTypes = { size: PropTypes.string }
export const EstimatedTerm = ({ children, size }) =>
  <Term id="estimated data" size={size}>
    {children || 'estimated'}
  </Term>

EstimatedTerm.propTypes = propTypes
EstimatedTerm.defaultProps = {
  size: 'md',
}

export const NibrsTerm = ({ children, size }) =>
  <Term id={'national incident-based reporting system (nibrs)'} size={size}>
    {children || 'incident-based (NIBRS)'}
  </Term>

NibrsTerm.propTypes = propTypes
NibrsTerm.defaultProps = {
  size: 'md',
}

export const SHRTerm = ({ children, size }) =>
  <Term id={'Supplemental Homicide Report (SHR)'} size={size}>
    {children || 'Supplemental Homicide Report (SHR)'}
  </Term>

NibrsTerm.propTypes = propTypes
NibrsTerm.defaultProps = {
  size: 'md',
}

export const SrsTerm = ({ children, size }) =>
  <Term id={'summary reporting system (srs)'} size={size}>
    {children || 'summary (SRS)'}
  </Term>

SrsTerm.propTypes = propTypes
SrsTerm.defaultProps = {
  size: 'md',
}
