import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import ToggleButton from './ToggleButton'
import {getClient} from '../services/contentfulClient'
import styles from './Nav.css'
import CSSModules from 'react-css-modules'
import {changeTokenType} from '../actions/actions.js'

const PRODUCTION = 'delivery'
const PREVIEW = 'preview'
class Nav extends React.Component {
  constructor () {
    super()
    this.state = {currentTokenType: 'preview'}
  }
  handleChange (isProduction) {
    this.setState({currentTokenType: isProduction ? PRODUCTION : PREVIEW})
    changeTokenType(!isProduction)
  }
  selectedWhenIn (mode) {
    if (mode === this.state.currentTokenType) {
      return 'selected'
    }
    return 'idle'
  }
  render () {
    if (!getClient()) { return null }
    const q = this.props.query
    return (
      <ul>
        <li styleName={this.selectedWhenIn(PREVIEW)}>Preview</li>
        <li><ToggleButton changeHandler={this.handleChange.bind(this)}/></li>
        <li styleName={this.selectedWhenIn(PRODUCTION)}>Delivery</li>
        <li><Link to={{pathname: '/entries', query: q}}>Entries</Link></li>
        <li><Link to={{pathname: '/assets', query: q}}>Assets</Link></li>
        <li><Link to={{pathname: '/', query: q}}>Settings</Link></li>
      </ul>
      )
  }
}
Nav.propTypes = {
  query: PropTypes.object.isRequired
}
export default CSSModules(Nav, styles)
