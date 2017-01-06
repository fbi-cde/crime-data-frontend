import { format } from 'd3-format'
import React from 'react'

const DetailsCard = ({
  data,
  title,
}) => {
  const colWidths = ['3', '2', '4', '3']
  const formatPercent = format('.0%')
  const formatNumber = format(',')
  const total = data.reduce((a, b) => (a + b.count), 0)
  const dataParsed = data.map(d => ({ ...d, percent: (d.count / total) }))

  return (
    <div className='p2 sm-p3 bg-white rounded'>
      <h3 className='mt0 mb1'>{title}</h3>
      <div className='mb1 h6 blue caps bold right-align'>Incidents</div>
      <table>
        <thead>
          <tr>
            {colWidths.map((c, i) => <th key={i} className={`col-${c}`} />)}
          </tr>
        </thead>
        <tbody>
          {dataParsed.map((d, i) => (
            <tr key={i}>
              <td>
                <div className='progress-bar my1'>
                  <span className='rtl' style={{ width: `${d.percent * 100}%` }} />
                </div>
              </td>
              <td className='right-align'>{formatPercent(d.percent)}</td>
              <td className='px2'>{d.key}</td>
              <td className='right-align'>{formatNumber(d.count)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

DetailsCard.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  title: React.PropTypes.string.isRequired,
}

export default DetailsCard
