import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './NotificationLink.css'
import {Link} from 'react-router'
import {getClient} from '../services/contentfulClient'

class NotificationLink extends React.Component {
  render () {
    if (!getClient()) { return null }
    return (
      <div>
        <div styleName='counter'>
          <span styleName='badge'>0</span>
        </div>
        <Link to={this.props.to}>{this.props.label}</Link>
      </div>
    )
  }
}
NotificationLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.object.isRequired
}

export default CSSModules(NotificationLink, styles)
