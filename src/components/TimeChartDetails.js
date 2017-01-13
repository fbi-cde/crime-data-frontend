import { format } from 'd3-format'
import React from 'react'

const formatRate = format('.1f')
const formatTotal = format(',.0f')

const TimeChartDetails = ({ colors, data, keys }) => {
  const year = data.date.getFullYear()
  // const rate = data[keys[1].slug]

  return (
    <div className='mb1 p2 bg-light-blue-darker md-flex'>
      <div className='flex-auto'>
        <h3 className='mt0 mb-tiny monospace inline-block'>{year}</h3>
        <p className='sm-m0 md-col-10 lg-col-8 h5'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fermentum, est
          luctus tempus vestibulum, nisi justo posuere ligula, lobortis consectetur
          ante felis ac odio.
        </p>
      </div>
      <div>
        <table className='h5 table-condensed'>
          <thead className='h6 caps'><tr><th /><th>Rate</th><th>Total</th></tr></thead>
          <tbody>
            {keys.map((k, i) => (
              <tr key={i}>
                <td className='nowrap'>
                  <span
                    className='mr1 inline-block circle'
                    style={{ width: 10, height: 10, backgroundColor: colors[i] || '#000' }}
                  />
                  <strong>{k.name}</strong>
                </td>
                <td className='monospace'>
                  {formatRate(data[k.slug])}
                </td>
                <td className='monospace'>
                  {formatTotal(data[k.slug] * 98)}
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
