import snakecase from 'lodash.snakecase'

export const reshapeData = dataIn => Object.assign(...dataIn.map(d => ({ [d.key]: d.results })))
