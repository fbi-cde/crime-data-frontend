import PropTypes from 'prop-types'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BetaBanner from './BetaBanner'
import ClearCacheBtn from './ClearCacheBtn'
import Disclaimer from './Disclaimer'
import Feedback from './Feedback'
import Footer from './Footer'
import Glossary from './Glossary'
import Header from './Header'
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
