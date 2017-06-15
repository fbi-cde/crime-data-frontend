import PropTypes from 'prop-types'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BetaBanner from '../components/BetaBanner'
import ClearCacheBtn from '../components/ClearCacheBtn'
import Disclaimer from '../components/Disclaimer'
import Feedback from '../components/Feedback'
import Footer from '../components/Footer'
import Glossary from '../components/Glossary'
import Header from '../components/Header'
import * as feedbackActions from '../actions/feedback'
import * as glossaryActions from '../actions/glossary'

const isProd = process.env.NODE_ENV === 'production'

const App = ({ actions, appState, children, dispatch, location }) => (
  <div className="site">
    <Disclaimer />
    <BetaBanner onFeedbackClick={actions.showFeedback} />
    <Header location={location} />
    <main className="site-main">
      {children && React.cloneElement(children, { appState, dispatch })}
    </main>
    <Glossary actions={actions} {...appState.glossary} />
    <Footer actions={actions} />
    {!isProd && <ClearCacheBtn />}
    <Feedback
      isOpen={appState.feedback.isOpen}
      onClose={actions.hideFeedback}
    />
  </div>
)

App.propTypes = {
  appState: PropTypes.object,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({ appState: state })
const mapDispatchToProps = dispatch => ({
  dispatch,
  actions: bindActionCreators(
    { ...feedbackActions, ...glossaryActions },
    dispatch,
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
