import React from 'react'
import startCase from 'lodash.startcase'

import DownloadDataBtn from './DownloadDataBtn'
import Loading from './Loading'
import NoData from './NoData'
import Term from './Term'
import TrendChart from './TrendChart'
import ucrParticipation from '../util/ucr'

class TrendContainer extends React.Component {
  constructor(props) {
    super(props)
    this.getSourceText = ::this.getSourceText
  }

  getSourceText(place) {
    const { dispatch } = this.props
    const ucr = ucrParticipation(place)
    let text

    if (ucr.srs && ucr.nibrs) {
      text = (
        <span>
          <Term id='summary reporting system (srs)' dispatch={dispatch}>
            Summary (SRS)
          </Term>
          {' and '}
          <Term id='national incident-based reporting system (nibrs)' dispatch={dispatch}>
            summarized incident (NIBRS)
          </Term>
        </span>
      )
    } else if (ucr.srs && !ucr.nibrs) {
      text = (
        <span>
          <Term id='summary reporting system (srs)' dispatch={dispatch}>
            Summary (SRS)
          </Term>
        </span>
      )
    } else if (!ucr.srs && ucr.nibrs) {
      text = (
        <span>
          <Term id='national incident-based reporting system (nibrs)' dispatch={dispatch}>
            Summarized incident (NIBRS)
          </Term>
        </span>
      )
    }

    return text
  }

  render() {
    const { crime, place, filters, data, dispatch, loading, keys } = this.props
    const { timeFrom, timeTo } = filters
    let content = null
    if (loading) content = <Loading />
    else if (!data || data.length === 0) content = <NoData />
    else {
      content = (
        <TrendChart crime={crime} data={data} dispatch={dispatch} keys={keys} />
      )
    }

    return (
      <div>
        <div className='mb2 p2 sm-p4 bg-blue-lighter'>
          <div className='lg-flex items-baseline'>
            <div className='flex-auto'>
              <div className='inline-block'>
                <h2 className='m0 fs-24 sm-fs-32 sans-serif'>
                  {startCase(crime)} rate in {startCase(place)},
                  <br />
                  {timeFrom}–{timeTo}
                </h2>
              </div>
            </div>
            <div>
              <DownloadDataBtn
                data={data}
                fname={`${place}-${crime}-${timeFrom}–${timeTo}`}
                text='Download data'
              />
            </div>
          </div>
        </div>
        <div className='mb2'>{content}</div>
        {!loading && (
        <div className='center italic fs-12 mb8'>
          <p>
            Source: {this.getSourceText(place)} data from {startCase(place)}, {timeFrom}–{timeTo}.
          </p>
        </div>
        )}
      </div>
    )
  }
}

export default TrendContainer
