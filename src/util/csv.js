import flatten from 'lodash.flatten'


const flattenCols = data => {
  const firstRow = data[0]
  const colsToFlatten = Object.keys(firstRow).map(key => {
    if (typeof firstRow[key] !== 'object') return key
    return Object.keys(firstRow[key]).map(childKey => `${key}.${childKey}`)
  })

  return flatten(colsToFlatten)
}

const jsonToCsv = data => {
  const cols = flattenCols(data)
  const values = data.map(d => cols.map(c => {
    const split = c.split('.')
    return (split.length > 1) ? d[split[0]][split[1]] : d[split]
  }))

  return `${cols.join(',')}\n${values.join('\n')}`
}

export default jsonToCsv
