import React from 'react'

const TimeChartDetails = ({ colors, data, keys }) => {
  const year = data.date.getFullYear()

  return (
    <div className='mb1 p2 bg-light-blue md-flex'>
      <div className='flex-auto'>
        <div className='mb1 monospace bold underline inline-block active-year'>{year}</div>
        <p className='sm-m0 md-col-10 lg-col-8 h5'>
          Ohio’s incident rate surpasses that of the United States, and
          in {year} was {data[keys[0]]} incidents per 100,000 people.
        </p>
      </div>
      <div>
        <table className='h5 table-condensed'>
          <thead><tr><th /><th>Rate</th><th>Total</th></tr></thead>
          <tbody>
            {keys.map((k, i) => (
              <tr key={i}>
                <td className='nowrap'>
                  <span
                    className='mr1 inline-block circle'
                    style={{ width: 10, height: 10, backgroundColor: colors[i] || '#000' }}
                  />
                  <strong>{k}</strong>
                </td>
                <td className='monospace'>{data[k]}</td>
                <td className='monospace'>{data[k] * 100}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TimeChartDetails
