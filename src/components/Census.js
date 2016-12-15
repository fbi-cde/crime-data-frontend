import React from 'react'

const Census = ({ data, source }) => (
  <div className='bg-aqua p2'>
    <h2 className='border-bottom m0 pb1'>Census Overview</h2>
    <ul className='list-style-none px0'>
      { data.map((d, i) => (
        <li key={i}>
          <strong>{ d.statistic }</strong> { d.label }
        </li>
      ))}
    </ul>
    <a href={source} className='italic'>
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
