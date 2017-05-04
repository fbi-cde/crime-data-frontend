/* eslint react/forbid-prop-types: 0 */

import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import BetaBanner from './BetaBanner'
import BetaModal from './BetaModal'
import ClearLocalStorageBtn from './ClearLocalStorageBtn'
import Disclaimer from './Disclaimer'
import Feedback from './Feedback'
import Footer from './Footer'
import Glossary from './Glossary'
import Header from './Header'

import { hideFeedback, showFeedback } from '../actions/feedback'
import { hideModal } from '../actions/modal'

const isProd = process.env.NODE_ENV === 'production'

const App = ({ appState, children, dispatch, location }) => (
  <div className="site">
    <Disclaimer />
    <BetaBanner onClick={() => dispatch(showFeedback())} />
    <Header location={location} />
    <main className="site-main">
      {children && React.cloneElement(children, { appState, dispatch })}
    </main>
    <Glossary dispatch={dispatch} {...appState.glossary} />
    <Footer dispatch={dispatch} />
    {!isProd && <ClearLocalStorageBtn />}
    {isProd &&
      appState.modal.isShown &&
      <BetaModal
        onClose={() => dispatch(hideModal())}
        onFeedbackClick={() => dispatch(showFeedback())}
      />}
    <Feedback
      isOpen={appState.feedback.isOpen}
      onClose={() => dispatch(hideFeedback())}
    />
  </div>
)

App.propTypes = {
  appState: PropTypes.object,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({ appState: state })
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(App)
