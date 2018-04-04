import PropTypes from 'prop-types'
import React from 'react'

import BarChart from './BarChart'
import StackedBarChart from './StackedBarChart'

import { slugify } from '../../util/text'

class DisplayCard extends React.Component {

    render() {
      const { data, place, year, until } = this.props
      console.log('DisplayCard:', data)
      let charts = null;
      switch (data.ui_type) {
        case 'basic_table':
          charts = (<BarChart data={data} year={year} until={until} />)
          break;
        case 'stacked_table':
            return (<div className='bg-blue-white p2'><div className="mt0 pb1 fs-18">                                                    <h2 className="mt0 fs-18 sans-serif blue">                                                    {data.title}</h2><StackedBarChart data={data} year={year} until={until} /> </div>                                                    </div>)
        default:
          charts = null
      }

      if (!charts) return null;

      const download = {
        data: data.data,
        filename: `${place}-leoka-${slugify(data.noun
        )}-${year}.csv`,
      }

      return (
        <div className='bg-blue-white p2 border-bottom border-blue-light'>
          <div className="mt0  pb1 fs-18">
            <h2 className="mt0 fs-18 sans-serif blue">
              {data.title}
            </h2>
              {charts}
          </div>
        </div>
      )
    }

}

DisplayCard.propTypes = {
  data: PropTypes.object.isRequired,
  place: PropTypes.string,
  year: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

export default DisplayCard
