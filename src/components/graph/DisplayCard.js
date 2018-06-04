import PropTypes from 'prop-types'
import React from 'react'

import BarChart from './BarChart'
import StackedBarChart from './StackedBarChart'

import { slugify } from '../../util/text'

class DisplayCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  showMoreFunc = e => {
    if (this.state.expanded === false) {
      this.setState({ expanded: true })
    } else {
      this.setState({ expanded: false })
    }
  }

  render() {
    const { data, place, year, until, showMore } = this.props
    console.log('RENDER')
    let charts = null
    switch (data.ui_type) {
      case 'basic_table':
        charts = <BarChart data={data} year={year} until={until} />
        break
      case 'stacked_table':
        charts = <StackedBarChart data={data} year={year} until={until} />
        break
      default:
        charts = null
    }

    if (!charts) return null

    const download = {
      data: data.data,
      filename: `${place}-leoka-${slugify(data.noun)}-${year}.csv`
    }

    return (
      <div className="bg-blue-white p2 border-bottom border-blue-light">
        <div className="mt0  pb1 fs-18">
          {showMore && (
            <a
              className="btn btn-sm btn-primary fs-12 right"
              onClick={this.showMoreFunc}
            >
              {this.state.expanded ? <span>Hide </span> : <span>Show </span>}
            </a>
          )}
          <h2 className="mt0 fs-18 sans-serif blue">{data.title}</h2>
          {this.state.expanded && charts}
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
  showMore: PropTypes.boolean
}

export default DisplayCard
