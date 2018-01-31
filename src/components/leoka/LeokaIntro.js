import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'


const LeokaIntro = ({
  pageType,
  participation,
  year,
}) => {
  let aboutDiv;
  if (pageType === 'assault') {
    aboutDiv = (
      <div className="m0 sm-col-10">
        <p>
          The following information concerns duly sworn city, university and college,
          county, state, and tribal law enforcement officers who were assaulted
          in the line of duty and who met certain other criteria.
        </p>
        <p>
          Quick Stats?
        </p>
      </div>
    )
  }
  if (participation) {
    // Add to About Div about Participation Data Data from XXXX Law Enforcement Agencies
  }
  return (aboutDiv)
}

LeokaIntro.propTypes = {
  pageType: PropTypes.string.isRequired,
  participation: PropTypes.object,
  year: PropTypes.number.isRequired,
}

export default LeokaIntro
