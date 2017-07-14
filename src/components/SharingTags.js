import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const SharingTags = ({ description, image, title }) =>
  <div>
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fbi" />
    </Helmet>
  </div>

SharingTags.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
}

SharingTags.defaultProps = {
  description:
    'The Crime Data Explorer publishes nationwide crime data collected by the FBI in an open and accessible format.',
  image: 'https://crime-data-explorer.fr.cloud.gov/img/cde-logo.png',
  title: 'FBI Crime Data Explorer',
}

export default SharingTags
