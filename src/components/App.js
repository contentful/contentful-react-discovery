import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import Nav from './Nav'
import NotificationLink from './NotificationLink'
import ToggleButton from './ToggleButton'
import { getClient } from '../services/contentfulClient'

class App extends React.Component {
  handleChange (isPreview) {
    const {api} = this.props
    const query = {
      preview_access_token: api.previewAccessToken,
      delivery_access_token: api.deliveryAccessToken,
      preview: isPreview,
      space_id: api.space
    }
    this.context.router.push({
      pathname: '/entries/by-content-type',
      query: query
    })
  }
  shouldDisplay () {
    if (!getClient()) {
      return 'hidden'
    }
    return 'displayed'
  }
  render () {
    return (
      <div styleName='app-container'>
        <nav>
          <div styleName='nav-container'>
            <div styleName='logo'>
              <img src='/contentful_logo_120x90@2x.png' height='32' />
              <span>Discovery App</span>
            </div>
            <div styleName={this.shouldDisplay()}>
              <Nav location={this.props.location} />
            </div>
            <div styleName={this.shouldDisplay()}>
              <NotificationLink
                count={this.props.requests.length}
                styleName='requests-link'
                label='API Requests'
                to={{pathname: '/requests', query: this.props.location.query}} />
            </div>
            <div styleName={this.shouldDisplay()}>
              <ToggleButton
                checked={this.props.api.selectedApi === 'preview'}
                unCheckedLabel='Delivery API Key'
                checkedLabel='Preview API Key'
                changeHandler={this.handleChange.bind(this)}
                disabled={!this.props.api.previewAccessToken || !this.props.api.deliveryAccessToken} />
            </div>
          </div>
        </nav>
        <div styleName='content-container'>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    )
  }
}
App.contextTypes = {
  router: PropTypes.object.isRequired
}

export default CSSModules(App, styles)
