import PropTypes from 'prop-types'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Analytics from './components/Analytics'
import ClearCacheBtn from './components/ClearCacheBtn'
import Disclaimer from './components/Disclaimer'
import Feedback from './components/Feedback'
import Footer from './components/Footer'
import Glossary from './components/Glossary'
import Header from './components/Header'
import SkipContent from './components/SkipContent'
import { hideFeedback, showFeedback } from './actions/feedback'
import * as glossaryActions from './actions/glossary'

const isProd = process.env.NODE_ENV === 'production'

const App = ({
  actions,
  children,
  feedbackOpen,
  glossary,
  location,
  sidebarOpen,
}) =>
  <div className={`site ${sidebarOpen ? 'no-scroll' : ''}`}>
    <SkipContent skipTo=".site-main" />
    <Disclaimer />
    <Header location={location} />
    <main id="cde-main" className="site-main">
      {children}
    </main>
    <Glossary actions={actions} {...glossary} />
    <Footer actions={actions} />
    {!isProd && <ClearCacheBtn />}
    <Feedback isOpen={feedbackOpen} onClose={actions.hideFeedback} />
    <Analytics />
  </div>

App.propTypes = {
  actions: PropTypes.shape({
    hideFeedback: PropTypes.func,
    showFeedback: PropTypes.func,
  }),
  feedbackOpen: PropTypes.bool,
  glossary: PropTypes.object,
  sidebarOpen: PropTypes.bool,
}

const mapStateToProps = ({ feedback, glossary, sidebar }) => ({
  feedbackOpen: feedback.isOpen,
  glossary,
  sidebarOpen: sidebar.isOpen,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { hideFeedback, showFeedback, ...glossaryActions },
    dispatch,
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
