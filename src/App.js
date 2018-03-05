import PropTypes from 'prop-types'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Analytics from './components/Analytics'
import BetaBanner from './components/BetaBanner'
import ClearCacheBtn from './components/ClearCacheBtn'
import Disclaimer from './components/Disclaimer'
import NOEDisclaimer from './components/NOEDisclaimer'
import Footer from './components/Footer'
import Glossary from './components/Glossary'
import Header from './components/Header'
import SkipContent from './components/SkipContent'
import * as glossaryActions from './actions/glossary'

const isProd = process.env.NODE_ENV === 'production'

const App = ({
  actions,
  children,
  glossary,
  location,
  sidebarOpen,
}) =>
  <div className={`site ${sidebarOpen ? 'no-scroll' : ''}`}>
    <SkipContent skipTo=".site-main" />
    {!isProd && <NOEDisclaimer />}
    {isProd && <Disclaimer />}
    <BetaBanner onFeedbackClick={actions.showFeedback} />
    <Header location={location} />
    <main id="cde-main" className="site-main">
      {children}
    </main>
    <Glossary actions={actions} {...glossary} />
    <Footer actions={actions} />
    {!isProd && <ClearCacheBtn />}
    <Analytics />
  </div>

App.propTypes = {
  actions: PropTypes.shape({
    hideFeedback: PropTypes.func,
    showFeedback: PropTypes.func,
  }),
  glossary: PropTypes.object,
  sidebarOpen: PropTypes.bool,
}

const mapStateToProps = ({ glossary, sidebar }) => ({
  glossary,
  sidebarOpen: sidebar.isOpen,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...glossaryActions },
    dispatch,
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
