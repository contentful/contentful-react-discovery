import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'
import App from './App'

function mapStateToProps (state) {
  return {
    api: state.api,
    contentTypes: state.contentTypes,
    entries: state.entries,
    requests: state.requests
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App)

export default Main
