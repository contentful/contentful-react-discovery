import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import ToggleButton from './ToggleButton'
import {getClient} from '../services/contentfulClient'
import styles from './Nav.css'
import CSSModules from 'react-css-modules'
import {resetClient} from '../services/contentfulClient'

class Nav extends React.Component {
  constructor () {
    super()
    this.state = {currentTokenType: 'preview'}
  }
  handleChange (isPreview) {
    this.setState({currentTokenType: isPreview ? 'delivery' : 'preview'})
    resetClient()
    // const query = Object.assign({}, this.props.location.query, {preview: isPreview})
    // this.context.router.push({pathname: this.props.location.pathname, query})
  }
  selectedWhenIn (mode) {
    if (mode === this.state.currentTokenType) {
      return 'selected'
    }
    return 'idle'
  }
  render () {
    if (!getClient()) { return null }
    const q = this.props.location.query
    return (
      <ul>
        <li styleName={this.selectedWhenIn('preview')}>Preview</li>
        <li><ToggleButton changeHandler={this.handleChange.bind(this)}/></li>
        <li styleName={this.selectedWhenIn('delivery')}>Delivery</li>
        <li><Link to={{pathname: '/entries', query: q}}>Entries</Link></li>
        <li><Link to={{pathname: '/assets', query: q}}>Assets</Link></li>
        <li><Link to={{pathname: '/', query: q}}>Settings</Link></li>
      </ul>
      )
  }
}
Nav.propTypes = {
  location: PropTypes.object.isRequired
}
Nav.contextTypes = {
  router: PropTypes.object.isRequired
}

export default CSSModules(Nav, styles)
