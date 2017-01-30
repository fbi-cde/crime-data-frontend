import { format } from 'd3-format'
import React from 'react'

const formatRate = format('.1f')
const formatTotal = format(',.0f')

const TimeChartDetails = ({ colors, data, keys }) => {
  const { name, slug } = keys[1]
  const year = data.date.getFullYear()
  const rate = data[slug]

  const highlight = v => <span className='bold blue'>{v}</span>

  return (
    <div className='mb2 md-flex'>
      <div className='flex-auto'>
        <h4 className='mt0 mb1 sans-serif'>{year}</h4>
        <p className='sm-m0 md-pr4'>
          {name}’s incident rate surpasses that of the United States, and
          in {highlight(year)} was {highlight(formatRate(rate))} incidents
          per 100,000 people.
        </p>
      </div>
      <div>
        <table className='mt4 h5 bold'>
          <thead className='h6 caps line-height-3'>
            <tr><th /><th>Rate</th><th>Total</th></tr>
          </thead>
          <tbody>
            {keys.map((k, i) => (
              <tr key={i}>
                <td className='pr3 nowrap align-bottom'>
                  <span
                    className='mr1 inline-block circle'
                    style={{ width: 8, height: 8, backgroundColor: colors[i] || '#000' }}
                  />
                  {k.name}
                </td>
                <td className='pt1 pr3 h4 line-height-2 align-bottom'>
                  <span
                    className='inline-block border-bottom border-blue-light border-w2'
                    style={{ width: 72 }}
                  >
                    {formatRate(data[k.slug])}
                  </span>
                </td>
                <td className='pt1 h4 line-height-2 align-bottom'>
                  <span
                    className='inline-block border-bottom border-blue-light border-w2'
                    style={{ width: 72 }}
                  >
                    {formatTotal(data[k.slug] * 98)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TimeChartDetails
