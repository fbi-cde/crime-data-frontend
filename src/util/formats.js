import { format } from 'd3-format'

export const formatNum = format(',')
export const formatRound = format(',.0f')
export const formatOneDec = format(',.1f')

export const formatPerc = p => (+p > 0.01 ? format('.0%')(p) : '<1%')
export const formatSI = n => (+n > 10000 ? format('.3s')(n) : formatNum(n))

export const formatAxisNum = n =>
  format(`,.${+n > 10 || +n % 1 === 0 ? 0 : 1}f`)(n)
