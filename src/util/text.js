import lowerCase from 'lodash.lowercase'
import upperFirst from 'lodash.upperfirst'

export const sentenceCase = (str = '') => {
  const l = lowerCase(str).split(' ')
  return `${upperFirst(l[0])} ${l.slice(1).join(' ')}`
}

export const slugify = (str = '') => lowerCase(str).replace(/\s+/g, '-')
