import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion'

import otherDatasets from '../../../content/downloadDetails.yml'
import DownloadDetailsAccordionBody from './DownloadDetailsAccordionBody'

class DownloadAccordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItems: [0, 1],
      value: ''
    }
    this.changeActiveItems = this.changeActiveItems.bind(this)
  }

  handleChange = evt => {
    this.setState({
      value: evt.target.value
    })
  }

  changeActiveItems(activeItems) {
    this.setState({
      activeItems
    })
  }

  render() {
    return (
      <div>
        <Accordion>
          {otherDatasets.map((d, i) => (
            <AccordionItem key={i} className="bg-blue-white">
              <AccordionItemTitle>
                <h3 className="m0 u-position-relative fs-14 sm-fs-18">
                  {d.title}
                  <div className="accordion__arrow" role="presentation" />
                </h3>
              </AccordionItemTitle>
              <AccordionItemBody>
                <DownloadDetailsAccordionBody title={d.title} />
              </AccordionItemBody>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  }
}
export default DownloadAccordion
