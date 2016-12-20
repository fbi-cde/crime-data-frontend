import React from 'react'

const Census = ({ data, source }) => (
  <div className='p2 bg-silver rounded'>
    <h4 className='m0 pb1 border-bottom'>Census Overview</h4>
    <ul className='list-style-none px0'>
      { data.map((d, i) => (
        <li key={i}>
          <strong className='monospace'>{d.statistic}</strong> { d.label }
        </li>
      ))}
    </ul>
    <a href={source} className='h5 italic'>
      Source: <span className='underline'>Census data</span>
    </a>
  </div>
)

Census.defaultProps = {
  source: 'https://census.gov',
}

Census.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  source: React.PropTypes.string,
}

export default Census
