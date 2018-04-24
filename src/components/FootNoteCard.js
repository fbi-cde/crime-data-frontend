import PropTypes from 'prop-types'
import React from 'react'

class FootNoteCard extends React.Component {

  generateDiv = data => {
      const footnotes = []
      console.log("data:",data)

      Object.keys(data).forEach(r => {
        console.log("r:",r)
          footnotes.push(
            <p>
              {data[r].data_year} - {data[r].foot_notes}
            </p>
            )
      })

      return (<div className="fs-12 serif italic">
              <div> Footnotes:</div>
              {footnotes}
            </div>)
    }


  render() {
    const { footnotes } = this.props

    if (footnotes.data.length !== 0) {
      return (this.generateDiv(footnotes.data))
    }
    return (<div />)
  }

}

FootNoteCard.propTypes = {
  footnotes: PropTypes.object.isRequired,
}

export default FootNoteCard
